import React, { useState } from 'react';

const Profil = () => {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstname = (e) => {
        setFirstname(e.target.value);
    };

    const handleSurname = (e) => {
        setSurname(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour mettre à jour les informations de l'utilisateur
        const json = {
            firstname,
            surname,
            email,
            password
        };
        console.log('Form Data:', json);

        // Add logic to save course data
        fetch('http://example.com/api/courses', {
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
            <h1>Profil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Firstname:
                    <input type="text" value={firstname} onChange={handleFirstname} />
                </label>
                <br />
                <label>
                    Surname:
                    <input type="text" value={surname} onChange={handleSurname} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmail} />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </label>
                <br />
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
};

export default Profil;