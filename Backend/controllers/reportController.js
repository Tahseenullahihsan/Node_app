const Sale = require('../models/Sale');
const moment = require('moment');

// Get a monthly report of sold amplifiers
exports.getMonthlyReport = async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();

    const sales = await Sale.aggregate([
      { $match: { saleDate: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$amplifier', totalSold: { $sum: '$quantitySold' } } },
    ]);

    res.status(200).json({ message: 'Monthly report fetched successfully!', sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
