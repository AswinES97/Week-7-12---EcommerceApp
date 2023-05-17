const { getWallet } = require("../models/wallet.model");
const { formatCurrency } = require("../services/currencyFormatter");

const httpGetWallet = async (req, res) => {
    let data;
    const user = req.user
    let walletData = await getWallet(user.userId)
    if (walletData === null) data = "No Wallet found!"
    if (walletData === false) data = 'Error to fetch data!'

    if (walletData) {
        walletData.balance = formatCurrency(walletData.balance)
        return res.json({ ok: true, data: walletData })
    }
    return res.status(400).json({ ok: false, data: data })
}

module.exports = {
    httpGetWallet: httpGetWallet
}