const mongoose = require('mongoose');

const amplifierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  addedAt: { type: Date, default: Date.now }, // To track when it was added to the shop
});

const Amplifier = mongoose.model('Amplifier', amplifierSchema);

module.exports = Amplifier;
