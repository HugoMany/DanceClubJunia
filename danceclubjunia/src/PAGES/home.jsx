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
import { Button } from '@mui/material';
import Recherche from './recherche';

function Home() {
    const h1Style = {
        fontFamily: 'Hagrid-Text-Extrabold-trial', // Use the font family name
    };

    const IMAGE_URL_ROCK = "https://atoutdanses44.fr/wp-content/uploads/2020/07/Rock-1.jpg";
    const IMAGE_URL_MODERNE = "https://i.pinimg.com/originals/7e/b8/b6/7eb8b6d2528dedade01925bb40bc8a9b.jpg";
    const IMAGE_URL_JAZZ = "https://th.bing.com/th/id/R.7955d0fea6ddd73a5f47f204a1a7e2aa?rik=YHnFz4OZNiAI3Q&riu=http%3a%2f%2fwww.dancexplosion.com.au%2fstatic%2fuploads%2fimages%2fmtgambier-d-2016-08838-wfrbkhqkgodt.jpg%3fmode%3dmax%26upscale%3dtrue%26width%3d768&ehk=NHcVNQ6kbCoKuFXkuanNaQqJo5CL26SX%2f7FWAX2xLws%3d&risl=&pid=ImgRaw&r=0";
    const IMAGE_URL_DANCE = "https://th.bing.com/th/id/R.9e51b6de6ba2706a47e90ad2d1dece24?rik=6UebFvcPX%2fQqwQ&pid=ImgRaw&r=0";




    return (
        <div><div>
            <Header title={"Accueil"}></Header>

            <br />



            <div>



            </div>



        </div>






            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
            <Recherche></Recherche>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_MODERNE})` }}>
                        <h3>Moderne</h3>
                        <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                        <img src="" alt="" srcSet="" />
                        <Button variant="contained" href="/blog/moderne">
                            Info
                        </Button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_ROCK})` }}>

                        <h3>Rock</h3>
                        <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                        <img src="" alt="" srcSet="" />
                        <Button variant="contained" href="/blog/rock">
                            Info
                        </Button>

                    </div></SwiperSlide>
                <SwiperSlide>                    
                    <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_DANCE})` }}>

                    <h3>Dance</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <Button variant="contained" href="/blog/classique">
                        Info
                    </Button>

                </div></SwiperSlide>
                {/* <SwiperSlide>                   
                <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_DANCE})` }}>

                    <h3>Jazz</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <Button variant="contained" href="">
                        Info
                    </Button>

                </div></SwiperSlide>

                <SwiperSlide>                   
                     <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_ROCK})` }}>

                    <h3>Jazz</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <Button variant="contained" href="">
                        Info
                    </Button>

                </div></SwiperSlide>
                <SwiperSlide>                    
                    <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_ROCK})` }}>

                    <h3>Classique</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <Button variant="contained" href="">
                        Info
                    </Button>

                </div></SwiperSlide>
                <SwiperSlide>                    
                    <div className="cours" style={{ backgroundImage: `url(${IMAGE_URL_ROCK})` }}>

                    <h3>Rock</h3>
                    <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                    <img src="" alt="" srcSet="" />
                    <Button variant="contained" href="">
                        Info
                    </Button>

                </div></SwiperSlide> */}
            </Swiper>
            <ListeFuturCours></ListeFuturCours>

        </div>


    );

}

export default Home;