import React, { useEffect, useState } from 'react';
import { URL_DB } from '../const/const';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import Header from '../elements/header';
import { Button , Alert} from '@mui/material';


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
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div>
      <Header title="Boutique"></Header>
      <h1>Boutique de tickets et abonnements </h1>
      <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                 {cardPrices.map((card, index) => (
                <SwiperSlide>                    
                <div className="boutique">

                <h3>Nombre de place : {card.number}</h3>
                <p>Prix {card.price}€ et prix unitaire {Math.round((card.price/card.number) * 100) / 100}€ / scéance</p>
                  
                  <Button variant="contained" color="primary" disabled style={{ margin: '10px' }}> Achat via Hello Asso</Button>
                  <Alert severity="info">Service Indisponible</Alert>
                </div>
                
                </SwiperSlide>

                ))}

              
                
      </Swiper>
       
        
    </div>
  );
};

export default Boutique;
