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
    const [captchaReady, setCaptchaReady] = useState(false);
    const [captcha, setCaptcha] = useState();
    const [errorMessage, setErrorMessage] = useState('');

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
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response JSON:', data);
                for (const [key, value] of Object.entries(data)) {
                    console.log(`${key}: ${value} (Type: ${typeof value})`);
                }

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
                    setErrorMessage('Identifiants invalides.');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                handleErrors(error.message);
            });
        } else {
            console.log("Captcha non validé");
            setErrorMessage("Captcha non validé");
        } 
    };

    const handleErrors = (status) => {
        switch (status) {
            case 'HTTP status 400':
                setErrorMessage('Email manquant.');
                break;
            case 'HTTP status 401':
                setErrorMessage('Mot de passe manquant.');
                break;
            case 'HTTP status 402':
                setErrorMessage('Email invalide.');
                break;
            case 'HTTP status 403':
                setErrorMessage('Mot de passe trop court (minimum 8 caractères).');
                break;
            case 'HTTP status 404':
                setErrorMessage('Captcha manquant.');
                break;
            case 'HTTP status 500':
                setErrorMessage('Erreur SQL.');
                break;
            case 'HTTP status 501':
                setErrorMessage('Identifiants invalides.');
                break;
            case 'HTTP status 502':
                setErrorMessage('Échec de la vérification reCAPTCHA.');
                break;
            case 'HTTP status 503':
                setErrorMessage('Erreur lors de la vérification reCAPTCHA.');
                break;
            default:
                setErrorMessage('Erreur inconnue.');
        }
    };

    const handleRecaptcha = value => {
        console.log("Captcha value:", value);    
        setCaptchaReady(true);
        setCaptcha(value);
    };

    return (
        <div>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <div className='Form'>
                <h2>Connexion</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
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
