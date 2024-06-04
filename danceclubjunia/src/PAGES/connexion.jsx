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
            
        
      
         <div className='Form'>
            <h2>Page de Connexion</h2>
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
            <button className='inscriptionLogin'>
            <span class="material-symbols-outlined">
swipe_right
</span> Inscription
            
            </button>
            <p><a className='mdpOublie' href='/'>Mot de passe oublié</a></p>
            </div>
        


         </div>        

    );
}

export default Connexion;