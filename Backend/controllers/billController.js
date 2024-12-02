const Sale = require('../models/Sale');
const Bill = require('../models/Bill');

// Generate a bill for a sale
exports.generateBill = async (req, res) => {
  const { saleId, customerDetails } = req.body;

  try {
    const sale = await Sale.findById(saleId).populate('amplifier');
    if (!sale) {
      return res.status(400).json({ message: 'Sale not found!' });
    }

    const bill = new Bill({
      sale: sale._id,
      totalAmount: sale.totalAmount,
      customerDetails,
    });

    await bill.save();

    // Mark the sale as bill generated
    sale.billGenerated = true;
    await sale.save();

    res.status(201).json({ message: 'Bill generated successfully!', bill });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
