const { getSingleAddress } = require('./address.model')
const { getCartItems, deleteAllProducts } = require('./cart.model')
const orderSchema = require('./orders.mong')
const productsModel = require('./products.model')
const { uuidv4 } = require('./products.model')

const placeOrder = async (userId, addressId, paymentMethod) => {
    if (userId && addressId) {
        try {
            const cartItems = await getCartItems(userId)
            const [address] = await getSingleAddress(userId, addressId)
            const orderId = uuidv4()
            let products = []
            let order
            let orderStatus

            cartItems.product.forEach(ele => {
                let item = {
                    pId : ele.pId,
                    quantity: ele.quantity,
                    size : ele.size,
                    boughtPrice : ele.subTotal
                } 
                products.push(item)
            })

            order = await new orderSchema({
                orderId : orderId,
                userId : userId,
                products : products,
                shippingAddress : address,
                paymentMethod: paymentMethod,
                totalPrice: cartItems.grandTotal,
                isPaid: false,
            })
            orderStatus = await order.save()

            if(orderStatus) await deleteAllProducts(userId)
            return Promise.resolve('Order Confirmed')

        } catch (err) {
            return Promise.reject('Order Not Placed!')
        }

    } else {
        return Promise.reject('Order Not Placed!')
    }
}

module.exports = {
    placeOrder: placeOrder
}