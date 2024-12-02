import React, { useState } from 'react';
import axios from 'axios';

const AmplifierForm = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amplifierData = { name, brand, price, quantity };
      const response = await axios.post('http://localhost:5000/api/amplifiers/add', amplifierData);
      setSuccessMessage(response.data.message);
      setName('');
      setBrand('');
      setPrice('');
      setQuantity('');
      setError('');
    } catch (error) {
      setError('Failed to add amplifier');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Amplifier</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="submit">Add Amplifier</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default AmplifierForm;
