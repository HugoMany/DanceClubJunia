import React, { useState } from 'react';
import Header from '../elements/header';
import '../css/login.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import Connexion from './connexion';
import Inscription from './inscription';

function ConnexionEtInscriptionSlider() {
    return (
        <div>
            <Header title="Login"></Header>
        <div className='connexionInscription'>    
        
         <Swiper
        //  pagination={{
        //      dynamicBullets: true,
        //  }}
        //  modules={[Pagination]}
         className="mySwiper"
     >e
         <SwiperSlide>
         <Connexion></Connexion>
         </SwiperSlide>
         <SwiperSlide>
         <Inscription></Inscription>             

         </SwiperSlide>
         </Swiper>


         </div>         </div>

    );
}

export default ConnexionEtInscriptionSlider;