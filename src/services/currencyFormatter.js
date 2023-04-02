function formatCurrency(amount) {
    // Convert the amount to a string and split it into an array
    let parts = amount.toFixed(2).toString().split(".");

    // Get the whole number part
    let wholeNumber = parts[0];

    // Add commas for thousands separator
    let regex = /(\d)(?=(\d{3})+(?!\d))/g;
    wholeNumber = wholeNumber.replace(regex, "$1,");

    // Combine the whole number and decimal parts with a period
    return "₹" + wholeNumber + "." + parts[1];
}

module.exports = formatCurrency