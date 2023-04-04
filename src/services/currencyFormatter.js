const currencyFormatter = require('currency-formatter')
function formatCurrency(amount) {
    return currencyFormatter.format(amount, { code: 'INR' });
}

module.exports = {
    formatCurrency
}