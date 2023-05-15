const WalletSchema = require('./wallet.mongo')

const createNewWallet = async (userId, amount, transactions) => {
    try {
        const newWallet = await new WalletSchema({
            userId: userId,
            balance: amount,
            transactions: [transactions]
        })
        return newWallet.save().then(res => JSON.parse(JSON.stringify(res)))

    } catch (err) {
        return Promise.reject(false)
    }
}

const updateExistingWallet = async (userId, amount,transactions) => {
    try {

        return await WalletSchema.findOneAndUpdate({ userId: userId }, {
            $inc: {
                balance: amount
            },
            $push: {
                transactions: transactions
            }
        }, { new: true }).then(res => JSON.parse(JSON.stringify(res)))

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

// update for cancelation and return
const updateWallet = async (userId, amount, description) => {
    const doesExist = await WalletSchema.findOne({ userId: userId })
    console.log('doesExist', doesExist);
    const transactions = {
        type: 'credit',
        amount: amount,
        description: description,
        date: Date.now()
    }

    if (!doesExist) return await createNewWallet(userId, amount, transactions)
    return updateExistingWallet(userId, amount, transactions)
}

module.exports = {
    updateWallet: updateWallet
}
