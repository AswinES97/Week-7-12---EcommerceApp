const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
    transactions: [
        {
            type: {
                type: String,
                enum: ['credit', 'debit'],
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
                required: true,
            },
        },
    ],
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Wallet', WalletSchema);
