import React, { useState } from 'react';
import axios from 'axios';

const SaleForm = () => {
  const [amplifier, setAmplifier] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleData = { amplifier, quantitySold };
      const response = await axios.post('http://localhost:5000/api/sales/sell', saleData);
      setSuccessMessage(response.data.message);
      setAmplifier('');
      setQuantitySold('');
      setError('');
    } catch (error) {
      setError('Failed to sell amplifier');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Sell Amplifier</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Amplifier ID"
          value={amplifier}
          onChange={(e) => setAmplifier(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity Sold"
          value={quantitySold}
          onChange={(e) => setQuantitySold(e.target.value)}
        />
        <button type="submit">Record Sale</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default SaleForm;
