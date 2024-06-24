import React, { useState } from 'react';
import Header from '../elements/header';
import { URL_DB } from '../const/const';
import ReCAPTCHA from "react-google-recaptcha";

function Inscription() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const connectionMethod = "mail";
    const [photo, setPhoto] = useState('');
    const [captchaReady, setCaptchaReady] = useState(false);
    const [captcha, setCaptcha] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleRecaptcha = value => {
        console.log("Captcha value:", value);    
        setCaptchaReady(true);
        setCaptcha(value);
    };

    const handleErrors = (status) => {
        switch (status) {
            case 400:
                setErrorMessage("Au moins un des champs suivants n'est pas rempli : firstname, surname, email, password, connectionMethod.");
                break;
            case 401:
                setErrorMessage('Email invalide.');
                break;
            case 402:
                setErrorMessage('Mot de passe trop court (minimum 8 caractères).');
                break;
            case 403:
                setErrorMessage('Captcha manquant.');
                break;
            case 500:
                setErrorMessage('Erreur SQL.');
                break;
            case 501:
                setErrorMessage("Erreur lors de la vérification de l'existence de l'email.");
                break;
            case 502:
                setErrorMessage('Email déjà utilisé.');
                break;
            case 503:
                setErrorMessage('Erreur lors de la création du compte.');
                break;
            case 504:
                setErrorMessage('Échec de la vérification reCAPTCHA.');
                break;
            case 505:
                setErrorMessage('Erreur lors de la vérification reCAPTCHA.');
                break;
            case 506:
                setErrorMessage('Erreur lors du hachage du mot de passe.');
                break;
            default:
                setErrorMessage('Erreur inconnue.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification des mots de passe
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

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
            fetch(URL_DB + 'guest/registerStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                if (data.success) {
                    window.location.href = '/connexion'; // Redirection après succès
                } else {
                    setErrorMessage('Erreur lors de l\'inscription.');
                }
            })
            .catch(response => {
                response.json().then(err => {
                    handleErrors(response.status);
                });
            });
        } else {
            console.log("Captcha non validé");
            setErrorMessage("Captcha non validé");
        }
    };

    return (
        <div className='Form'>
            <h2>Inscription</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="prenom"></label>
                    <input
                        placeholder='Prénom'
                        type="text"
                        id="nom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nom"></label>
                    <input
                        placeholder='Nom'
                        type="text"
                        id="prenom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="motDePasse"></label>
                    <input
                        placeholder='mot de passe'
                        type="password"
                        id="motDePasse"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <h5>Minimum 8 caractères</h5>
                </div>
                <div>
                    <label htmlFor="confirmMotDePasse"></label>
                    <input
                        placeholder='Confirmation mot de passe'
                        type="password"
                        id="confirmMotDePasse"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input
                        placeholder='Email'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <ReCAPTCHA sitekey="6LevBOUpAAAAAPNiDAGg0xCWMqBYRrivcvYIhCsX" onChange={handleRecaptcha} />
                <button className='connexionLogin' type="submit">S'inscrire</button>
            </form>
            <button className='inscriptionLogin'>
                <span className="material-symbols-outlined">swipe_left</span> Connexion
            </button>
        </div>
    );
}

export default Inscription;
