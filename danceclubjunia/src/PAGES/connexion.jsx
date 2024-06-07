import React, { useState } from 'react';
import '../css/login.css';
import { URL_DB } from '../const/const';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
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

        fetch(URL_DB + 'guest/login', {
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
