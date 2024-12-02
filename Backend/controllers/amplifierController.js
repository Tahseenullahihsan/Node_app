const Amplifier = require('../models/Amplifier');

// Add a new amplifier to the inventory
exports.addAmplifier = async (req, res) => {
  const { name, brand, price, quantity } = req.body;

  const amplifier = new Amplifier({
    name,
    brand,
    price,
    quantity,
  });

  try {
    await amplifier.save();
    res.status(201).json({ message: 'Amplifier added successfully!', amplifier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllAmplifiers = async (req, res) => {
    try {
      const amplifiers = await Amplifier.find(); // Fetch all amplifiers from the database
      res.status(200).json(amplifiers); // Return the amplifiers in the response
    } catch (error) {
      res.status(500).json({ message: error.message }); // Return an error if something goes wrong
    }
  };
  
