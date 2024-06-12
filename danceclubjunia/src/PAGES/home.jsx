import '../font/Hagrid-Text-Extrabold-trial.ttf'; // Import the font file
import React from 'react';
import Header from '../elements/header';
import '../css/home.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';


import ListeFuturCours from '../elements/listeFuturCours';

function Home() {
    const h1Style = {
        fontFamily: 'Hagrid-Text-Extrabold-trial', // Use the font family name
    };

  
  


    return (
        <div><div>
            <Header title={"Accueil"}></Header>

            <br />



            <div>



            </div>


          
        </div>



        
       

            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><div className="cours">
                    <h3>Jazz</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Dance</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Jazz</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Moderne</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Jazz</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Classique</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
                <SwiperSlide><div className="cours">
                    <h3>Rock</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <button>Acheter</button>

                </div></SwiperSlide>
            </Swiper>
            <ListeFuturCours></ListeFuturCours>
            
        </div>

        
    );

}

export default Home;