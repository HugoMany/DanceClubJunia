import '../font/Hagrid-Text-Extrabold-trial.ttf'; // Import the font file
import React from 'react';
import Header from '../elements/header';
import '../css/home.css';
import { useState } from 'react';
import ReactModal from 'react-modal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';

const swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

function Home() {
    const h1Style = {
        fontFamily: 'Hagrid-Text-Extrabold-trial', // Use the font family name
    };

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);

    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);

    const modalBody = (id) => (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            bgcolor: '#0000009e',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
        }}>
            <h2 id={`modal-modal-title-${id}`}>Text in a modal {id}</h2>
            <p id={`modal-modal-description-${id}`}>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Box>
    );


    return (
        <div><div>
            <Header ></Header>

            <br />

            <>Dance Club -----------------</><br></br>


            <h2>Choisissez votre cours</h2>

            <div>

                {/* // Installez la bibliothèque React Modal
            // npm install react-modal

            // Importez la bibliothèque React Modal dans votre fichier
            import React, { useState } from 'react';
            import ReactModal from 'react-modal'; */}





            </div>


            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title-1"
                aria-describedby="modal-modal-description-1"
            >
                {modalBody(1)}
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title-2"
                aria-describedby="modal-modal-description-2"
            >
                {modalBody(2)}
            </Modal>

            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title-3"
                aria-describedby="modal-modal-description-3"
            >
                {modalBody(3)}
            </Modal>
        </div>




            <a href='/rgpd/'>RGPD</a><br></br>
            <a href='/connexion/'>Connexion</a><br></br>
            <a href='/profil/'>Profil</a><br></br>
            <a href='/inscription/'>Créer un compte</a><br></br>
            <a href='/cours/'>Cours</a>


            <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

            <div class="cours">
                <div class="swiper mySwiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><div className="cours">
                            <h3>Classique</h3>
                            <p>La danse classique est une danse très technique qui demande beaucoup de rigueur.</p>
                            <img src="" alt="" srcSet="" />
                            <button onClick={handleOpen1}>Acheter</button>
                        </div></div>
                        <div class="swiper-slide"> <div className="cours">
                            <h3>Contemporain</h3>
                            <p>La danse contemporaine est une danse très libre qui permet de s'exprimer.</p>
                            <img src="" alt="" srcSet="" />
                            <button onClick={handleOpen2}>Acheter</button>
                        </div></div>
                        <div class="swiper-slide"><div class="cours">
                            <h3>Contemporain</h3>
                            <p>La danse contemporaine est une danse très libre qui permet de s'exprimer.</p>
                            <img src="" alt="" srcset="" />
                            <button onClick={handleOpen3}>Acheter</button>
                        </div></div>
                        <div class="swiper-slide">SLIDER3</div>
                        <div class="swiper-slide">SLIDER4</div>
                        <div class="swiper-slide">SLIDER5</div>
                        <div class="swiper-slide">SLIDER6</div>
                        <div class="swiper-slide">SLIDER6</div>
                        <div class="swiper-slide">SLIDER7</div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>

        </div>
    );

}

export default Home;