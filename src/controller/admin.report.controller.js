const pdfMake = require('pdfmake');
const ExcelJS = require('exceljs');
const { getOrderDetailsForReport } = require("../models/order.model")

function generatePdfReport(salesData,startDate,endDate) {
 
 
  }


const adminReportController = async (req, res) => {
    const query = req.query
    const data = await getOrderDetailsForReport(query.startDate, query.endDate)

    if (query.reportType === 'pdf') {
        generatePdfReport(data,query.startDate,query.endDate)
    }
}

module.exports = adminReportController