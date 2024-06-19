import React, { useState } from 'react';
import { URL_DB } from '../const/const';

const AjoutCredits = ({ userID }) => {
  const [creditAmount, setCreditAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addCredit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please login again.');
        return;
      }

      const response = await fetch(URL_DB + 'student/buyPlace', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentID: userID,
          type: "ticket",
          number: parseInt(creditAmount, 10)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred while adding credit.');
      }

      const data = await response.json();
      console.log('Credit added successfully:', data);
      setSuccessMessage('Credit added successfully.');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding credit:', error);
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Credit Amount"
        value={creditAmount}
        onChange={(e) => setCreditAmount(e.target.value)}
      />
      <button onClick={addCredit}>Add Credit</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AjoutCredits;
