import React, { useState } from 'react';
import { URL_DB } from '../const/const';
import { Button } from '@mui/material';

const AjoutCredits = ({ userID }) => {
  const [creditAmount, setCreditAmount] = useState('');
  const [creditType, setCreditType] = useState('ticket'); // Default to 'ticket'
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addCredit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please login again.');
        return;
      }

      const response = await fetch(URL_DB + 'teacher/addPlaceStudent', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentID: userID,
          type: creditType,
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
        placeholder="nombre de place"
        value={creditAmount}
        onChange={(e) => setCreditAmount(e.target.value)}
      />
      <select value={creditType} onChange={(e) => setCreditType(e.target.value)}>
        <option value="ticket">Ticket</option>
        <option value="card">Carte</option>
        {/* <option value="abonement">Abonnement</option> */}
      </select>
      <Button variant="contained" color="primary" onClick={addCredit}>Ajouter</Button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AjoutCredits;
