import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';

const MonthlyReport = () => {
  const [report, setReport] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports/monthly-report');
        setReport(response.data.sales);
      } catch (error) {
        setError('Failed to fetch report');
      }
    };
    fetchReport();
  }, []);

  return (
    <div>
      <h2>Monthly Sales Report</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Amplifier ID</th>
            <th>Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {report.length > 0 ? (
            report.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.totalSold}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReport;
