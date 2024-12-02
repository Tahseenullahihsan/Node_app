const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  sale: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true }, // Reference to the Sale model
  totalAmount: { type: Number, required: true },
  billDate: { type: Date, default: Date.now },
  paid: { type: Boolean, default: false }, // Whether the bill is paid or not
  customerDetails: { type: String, required: true }, // Customer name or details for the bill
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
