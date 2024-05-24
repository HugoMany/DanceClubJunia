import React, { useState } from 'react';

function Achat() {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('https://api.helloasso.com/v5/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        },
        body: JSON.stringify({
          "amount": 10,
          "currency": "EUR",
          "description": "cours de danse",
          "cardNumber": "1234567890",
          "expiryMonth": "01",
          "expiryYear": "2025",
          "cvv": "123"
        }),
      });

      if (response.ok) {
        setPaymentStatus('Payment successful!');
      } else {
        setPaymentStatus('Payment failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentStatus('An error occurred while processing the payment.');
    }
  };

  return (
    <div>
      <h1>Acheter des titres de cours de danse</h1>
      <h2>Choisissez votre cours</h2>
      <div>
        <h3>Rock</h3>
        <p>Le rock est une danse très populaire en France. Elle se danse en couple et est très simple à apprendre.</p>
        <p>Le rock est une danse très populaire en France. Elle se danse en couple et est très simple à apprendre.</p>
        <p>Le rock est une danse très populaire en France. Elle se danse en couple et est très simple à apprendre.</p>
        <p>Le rock est une danse très populaire en France. Elle se danse en couple et est très simple à apprendre.</p>
        <button onClick={handlePayment}>Acheter</button>
        <p>{paymentStatus}</p>
      </div>
    </div>
  );
};

export default Achat;
