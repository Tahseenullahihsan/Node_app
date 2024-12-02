const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  amplifier: { type: mongoose.Schema.Types.ObjectId, ref: 'Amplifier', required: true }, // Reference to the Amplifier model
  quantitySold: { type: Number, required: true },
  salePrice: { type: Number, required: true }, // Price at the time of sale
  totalAmount: { type: Number, required: true }, // Quantity * Sale Price
  saleDate: { type: Date, default: Date.now }, // Date when the sale occurred
  billGenerated: { type: Boolean, default: false }, // If the bill is generated or not
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
