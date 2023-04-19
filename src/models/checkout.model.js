const { generateOrderId } = require('../services/redis')
const { getSingleAddress } = require('./address.model')
const { getCartItems, deleteAllProducts } = require('./cart.model')
const orderSchema = require('./orders.mong')
const { getSingleProduct } = require('./products.model')
const productsMongo = require('./products.mongo')
// const productsModel = require('./products.model')

//quatity decrease when order placed
const decreaseQuantity = async (pId, quantity) => {
    try {
        await productsMongo.findOneAndUpdate({ pId: pId }, {
            $inc: {
                "quantity.quantity": -quantity
            }
        })
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => {
                if (!res) return false
                return true
            })

    } catch (err) {
        console.log(err);
        return false
    }
}

const quantityCheck = async (pId, quantity) => {
    const product = await getSingleProduct(pId)
    if (product) {
        if (quantity > product.quantity.quantity) return Promise.reject({
            bool: false,
            productName: product.name
        })
        return Promise.resolve(true)
    } else return Promise.reject(false)

}

const placeOrder = async (userId, addressId, paymentMethod) => {
    if (userId && addressId) {
        try {
            const cartItems = await getCartItems(userId)
            const [address] = await getSingleAddress(userId, addressId)
            const orderId = await generateOrderId()
            let quantityErr = {
                bool: true,
                productName: []
            }
            let products = []
            let order
            let orderStatus
            let item

            for (const ele of cartItems.product) {
                // quantity err to display which product has no quantity
                await quantityCheck(ele.pId, ele.quantity)
                    .then(response => {
                        quantityErr.bool = response
                    })
                    .catch(err => {
                        quantityErr.bool = err.bool
                        quantityErr.productName.push(err.productName)
                    })

                item = {
                    pId: ele.pId,
                    quantity: ele.quantity,
                    size: ele.size,
                    boughtPrice: ele.subTotal
                }
                products.push(item)
            }
            // checking if quantity exist else returning 
            if (quantityErr.bool) {
                order = await new orderSchema({
                    orderId: orderId,
                    userId: userId,
                    products: products,
                    shippingAddress: address,
                    paymentMethod: paymentMethod,
                    totalPrice: cartItems.grandTotal,
                    isPaid: false,
                })
                orderStatus = await order.save()
                cartItems.product.forEach(async ele => {
                    await decreaseQuantity(ele.pId, ele.quantity)
                })
                await deleteAllProducts(userId)
                return Promise.resolve({ totalAmount: orderStatus.totalPrice, orderId: orderId, status: 'Order Confirmed' })
            } else {
                return Promise.reject({ status: 'Some items in cart is out of stock', quantityErr })
            }

        } catch (err) {
            console.log(err);
            return Promise.reject({ status: 'Order Not Placed!' })
        }

    } else {
        return Promise.reject({ status: 'Order Not Placed!' })
    }
}

const updatePaymentStatus = async (data) => {
    const orderId = Number(data.order.receipt)
    try {
        return await orderSchema.findOneAndUpdate({ orderId: orderId }, {
            $set: {
                payment_status: 'Success',
                paymentResult: {
                    id: data.payment.razorpay_payment_id,
                    update_time: Date.now()
                },
                isPaid: true,
                paidAt: Date.now()
            }
        }, { new: true })
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))
    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

module.exports = {
    placeOrder: placeOrder,
    updatePaymentStatus: updatePaymentStatus
}