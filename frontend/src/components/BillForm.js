import React, { useState } from 'react';
import axios from 'axios';

const BillForm = () => {
  const [saleId, setSaleId] = useState('');
  const [customerDetails, setCustomerDetails] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const billData = { saleId, customerDetails };
      const response = await axios.post('http://localhost:5000/api/bills/generate-bill', billData);
      setSuccessMessage(response.data.message);
      setSaleId('');
      setCustomerDetails('');
      setError('');
    } catch (error) {
      setError('Failed to generate bill');
      setSuccessMessage('');
    }
  };

  return (
    <div className="form-container">
      <h2>Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sale ID"
          value={saleId}
          onChange={(e) => setSaleId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Customer Details"
          value={customerDetails}
          onChange={(e) => setCustomerDetails(e.target.value)}
        />
        <button type="submit">Generate Bill</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default BillForm;
