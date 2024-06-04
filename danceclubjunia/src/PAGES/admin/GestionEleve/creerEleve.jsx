import React, { useState } from 'react';
import Header from '../elements/header';
import '../css/login.css';
function CreerEleve() {
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
            <Header></Header>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Firstname:</label>
                    <input
                        type="text"
                        id="nom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="prenom">Surname:</label>
                    <input
                        type="text"
                        id="prenom"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="motDePasse">Password:</label>
                    <input
                        type="password"
                        id="motDePasse"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="connection">Connection Method:</label>
                    <input
                        type="text"
                        id="connectionMethod"
                        value={connectionMethod}
                        onChange={(e) => setConnectionMethod(e.target.value)}
                    />
                </div>
                <button type="submit">Creer l'élève</button>
            </form>
        </div>
    );
}

export default CreerEleve;