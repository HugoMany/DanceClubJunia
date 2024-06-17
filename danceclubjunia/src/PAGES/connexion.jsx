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
    const [capchaReady, setCapchaReady] = useState(false);

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
        
        if (capchaReady) {
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
                window.location.href = '/connexion'; // Décommentez cette ligne
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        }
    };
    const handleRecaptcha = value => {
        console.log("Captcha value:", value);        
        fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              response: value
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.captchaSuccess) {
              console.log('Captcha validation successful');
              setCapchaReady(true)
              // Continue with form submission
            } else {
              console.log('Captcha validation failed');
              // Show an error message
            }
          })
          .catch(err => {
            console.error(err);
            // Show an error message
          });
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
