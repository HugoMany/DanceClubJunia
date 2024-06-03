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

function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const json = {
            email,
            password
        };

        console.log('Form Data:', json);

        // Add logic to save course data
        fetch('http://example.com/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Header title="Login"></Header>
        <div>    
        
         <Swiper
         pagination={{
             dynamicBullets: true,
         }}
         modules={[Pagination]}
         className="mySwiper"
     >
         <SwiperSlide>
         <div className='Connexion'>
            {/* <h1>Page de Connexion</h1> */}
            <form onSubmit={handleSubmit}>
                <label>
                    <input  placeholder="E-mail" type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    <label>
                        
                        <input  placeholder="Mot de passe" type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                </label>
                <br />
                <button className='connexionLogin' type="submit">Se connecter</button>

                
            </form>
            <button className='inscriptionLogin'><a href='/inscription/'> 
            <span class="material-symbols-outlined">
swipe_right
</span> Inscription
            </a></button>
            </div>
         </SwiperSlide>
         <SwiperSlide>
         <div className='Connexion'>
            {/* <h1>Page de Connexion</h1> */}
            <form onSubmit={handleSubmit}>
                <label>
                    <input  placeholder="E-mail" type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    <label>
                        <input  placeholder="Mot de passe" type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                </label>
                <br />
                <button className='connexionLogin' type="submit">Se connecter</button>

                
            </form>
            {/* <button className='inscriptionLogin'><a href='/inscription/'>Inscription</a></button> */}
            </div>
             

         </SwiperSlide>
         </Swiper>


         </div>         </div>

    );
}

export default Connexion;