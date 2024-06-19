import React, { useState } from 'react';
import '../css/login.css';
import { URL_DB } from '../const/const';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ReCAPTCHA from "react-google-recaptcha";


function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaReady, setcaptchaReady] = useState(false);
    const [captcha, setcaptcha] = useState();

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
            password,
            captcha
        };
        
        if (captchaReady) {
        console.log('Starting fetch...');
        fetch(URL_DB + 'guest/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
        .then(response => {
            console.log('HTTP Status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response JSON:', data);
            for (const [key, value] of Object.entries(data)) {
                console.log(`${key}: ${value} (Type: ${typeof value})`);
            }

            //const success = (data.success === true || data.success === 'true');

            if (data.success === true) {
                console.log('Condition is true');
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log('Token stored in localStorage');
                } else {
                    console.log('Token is missing');
                }
                console.log('ok');
                window.location.href = '/'; // Décommentez cette ligne
            } else {
                console.log('pas ok');
                // window.location.href = '/connexion'; // Décommentez cette ligne
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        }
        else{
            console.log("Captcha non validé")
        } 
    };
    const handleRecaptcha = value => {
        console.log("Captcha value:", value);    
        setcaptchaReady(true);
        setcaptcha(value)


};
    return (
        <div>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className='Form'>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input placeholder="E-mail" type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label>
                        <input placeholder="Mot de passe" type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <ReCAPTCHA sitekey="6LevBOUpAAAAAPNiDAGg0xCWMqBYRrivcvYIhCsX" onChange={handleRecaptcha} />

                    <button className='connexionLogin' type="submit">Se connecter</button>
                </form>
                <button className='inscriptionLogin'>
                    <span className="material-symbols-outlined">swipe_right</span> Inscription
                </button>
                <p><a className='mdpOublie' href='/'>Mot de passe oublié</a></p>
            </div>
        </div>
    );
}

export default Connexion;
