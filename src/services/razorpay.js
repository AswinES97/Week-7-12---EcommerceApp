const Razorpay = require("razorpay")
const crypto = require('crypto')

module.exports = {
    razorpayPaymentGeneration: (orderId, totalAmount) => {
        try {
            return new Promise((resolve) => {
                const razorpay = new Razorpay({
                    // eslint-disable-next-line no-undef
                    key_id: process.env.RAZORPAY_KEY_ID,
                    // eslint-disable-next-line no-undef
                    key_secret: process.env.RAZORPAY_KEY_SECRET,
                })
                const options = {
                    amount: totalAmount * 100,
                    currency: "INR",
                    receipt: "" + orderId,
                    payment_capture: 1,
                }
                razorpay.orders.create(options, function (err, order) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(order)
                        resolve(order)
                    }
                })
            })
        } catch (error) {
            console.log(error)
            throw new Error("Failed to get razorpay")
        }
    },

    razorpayVerify: (paymentInfo) => {
        try {
            return new Promise((resolve, reject) => {
                let hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                hmac.update(
                    paymentInfo.razorpay_order_id +
                    "|" +
                    paymentInfo.razorpay_payment_id
                )
                hmac = hmac.digest("hex")
                if (hmac === paymentInfo.razorpay_signature) {
                    resolve({ status: true })
                } else {
                    reject(new Error("Payment failed"))
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error("Failed to verify razorpay payments")
        }
    }
}