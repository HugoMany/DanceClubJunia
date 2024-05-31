import React, { useState } from 'react';
import Header from '../elements/header';
import '../css/profil.css';
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
        <div className='Profil'>
            <Header title="Profil"></Header>
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
            <h2>Vos anciens cours</h2>
            <a href='/cours/4/5'>Cours 4/5</a><br></br>
            <a href='/cours/2/4'>Cours 2/4</a><br />
            <a href='/cours/1/3'>cours 1/3</a><br />

        </div>
    );
};

export default Profil;