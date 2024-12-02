const Amplifier = require('../models/Amplifier');
const Sale = require('../models/Sale');
// Sell an amplifier and create a sale record
exports.sellAmplifier = async (req, res) => {
    const { amplifier: amplifierId, quantitySold } = req.body;  // Destructure amplifier as amplifierId
    console.log("Received data:", req.body);
    
    try {
      const amplifier = await Amplifier.findById(amplifierId);  // Use amplifierId to query the database
      // Log the amplifier data for debugging
      console.log("Amplifier found:", amplifier);
      
      if (!amplifier || amplifier.quantity < quantitySold) {
        return res.status(400).json({ message: 'Insufficient stock!' });
      }
  
      const salePrice = amplifier.price; // Price at the time of sale
      const totalAmount = salePrice * quantitySold;
  
      // Create a sale record
      const sale = new Sale({
        amplifier: amplifier._id,
        quantitySold,
        salePrice,
        totalAmount,
      });
  
      await sale.save();
  
      // Update amplifier stock
      amplifier.quantity -= quantitySold;
      await amplifier.save();
  
      res.status(201).json({ message: 'Sale recorded successfully!', sale });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  