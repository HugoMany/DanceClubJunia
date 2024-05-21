import React, { useState } from 'react';

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
        // Ajoutez ici la logique de connexion avec l'e-mail et le mot de passe
    };

    return (
        <div>
            <h1>Page de Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    E-mail:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <br />
                <label>
                    Mot de passe:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Connexion;