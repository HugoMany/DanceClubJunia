import React, { useState } from 'react';
import Header from '../elements/header';
import {URL_DB} from '../const/const';
import ReCAPTCHA from "react-google-recaptcha";

function Inscription() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo, setPhoto] = useState('');
    const [captchaReady, setcaptchaReady] = useState(false);
    const [captcha, setcaptcha] = useState();

    const handleRecaptcha = value => {
        console.log("Captcha value:", value);    
        setcaptchaReady(true);
        setcaptcha(value)
};

    const handleSubmit = (e) => {
        e.preventDefault();
        const json = {
            firstname,
            surname,
            email,
            password,
            photo,
            connectionMethod,
            captcha
        };
        console.log('Form Data:', json);
        if (captchaReady) {
        // Add logic to save course data
        fetch(URL_DB+'guest/registerStudent', {
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
    }
    };

    return (
        <div className='Form'>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom"></label>
                    <input
                        placeholder='Firstname'
                        type="text"
                        id="nom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="prenom"></label>
                    <input
                        placeholder='Surname'
                        type="text"
                        id="prenom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="motDePasse"></label>
                    <input
                        placeholder='Password'
                        type="password"
                        id="motDePasse"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input
                        placeholder='E-mail'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="connection"></label>
                    <input
                        placeholder='Connection Method'
                        type="text"
                        id="connectionMethod"
                        value={connectionMethod}
                        onChange={(e) => setConnectionMethod(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="photo"></label>
                    <input
                        placeholder='Photo'
                        type="file"
                        id="photo"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                </div>
                <ReCAPTCHA sitekey="6LevBOUpAAAAAPNiDAGg0xCWMqBYRrivcvYIhCsX" onChange={handleRecaptcha} />

                <button className='connexionLogin' type="submit">S'inscrire</button>
            </form>
            <button className='inscriptionLogin'>
            <span class="material-symbols-outlined">
swipe_left
</span> Connexion
            
            </button>
        </div>
    );
}

export default Inscription;