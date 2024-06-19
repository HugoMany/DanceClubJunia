import React, { useEffect, useState } from 'react';
import { URL_DB } from '../const/const';


const Boutique = () => {
  const [cardPrices, setCardPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL_DB+'guest/getCardPrices')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setCardPrices(data.cardPrices);
        } else {
          throw new Error('Failed to fetch card prices');
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Card Prices</h1>
      <ul>
        {cardPrices.map((card, index) => (
          <li key={index}>
            Number of Places: {card.number}, Price: ${card.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Boutique;
