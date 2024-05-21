import React, { useState } from 'react';

function Inscription() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour traiter les données d'inscription
        console.log('Nom:', nom);
        console.log('Prénom:', prenom);
        console.log('Mot de passe:', motDePasse);
        console.log('Email:', email);
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom:</label>
                    <input
                        type="text"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="motDePasse">Mot de passe:</label>
                    <input
                        type="password"
                        id="motDePasse"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Inscription;