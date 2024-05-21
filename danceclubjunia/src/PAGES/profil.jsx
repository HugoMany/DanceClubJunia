import React, { useState } from 'react';

const Profil = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const handleNomChange = (e) => {
        setNom(e.target.value);
    };

    const handlePrenomChange = (e) => {
        setPrenom(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMotDePasseChange = (e) => {
        setMotDePasse(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour mettre à jour les informations de l'utilisateur
    };

    return (
        <div>
            <h1>Profil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input type="text" value={nom} onChange={handleNomChange} />
                </label>
                <br />
                <label>
                    Prénom:
                    <input type="text" value={prenom} onChange={handlePrenomChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Mot de passe:
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={handleMotDePasseChange}
                    />
                </label>
                <br />
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default Profil;