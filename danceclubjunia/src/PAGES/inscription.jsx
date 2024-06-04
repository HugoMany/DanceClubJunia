import React, { useState } from 'react';
import Header from '../elements/header';

function Inscription() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const credit = 0;

    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour traiter les données d'inscription
        const json = {
            firstname,
            surname,
            email,
            password,
            connectionMethod,
            credit
        };
        console.log('Form Data:', json);
        
        // Add logic to save course data
        fetch('http://example.com/api/inscription', {
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