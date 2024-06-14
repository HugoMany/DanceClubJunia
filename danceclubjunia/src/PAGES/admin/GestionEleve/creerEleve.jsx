import React, { useState } from 'react';
//import Header from '../elements/header';
//import '../css/login.css';
import { URL_DB } from '../../../const/const';
function CreerEleve() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo, setPhoto] = useState('');
    const credit = 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour traiter les données d'inscription
        const formData = {
            firstname,
            surname,
            email,
            password,
            connectionMethod,
            photo,
            credit
        };
        console.log('Form Data:', formData);

        const fetchProf = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return { valid: false };
                }

                console.log('Token:', token);

                const response = await fetch(URL_DB + 'teacher/newStudent', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log('Response:', data);

            } catch (error) {
                console.error('Erreur lors de la création du student', error);
            }
        };

        fetchProf();
    };

    return (
        <div className='Form'>
            <form onSubmit={handleSubmit}>
                <label>
                    firstname:
                    <input
                        type="text"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    surname:
                    <input
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    mail:
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    password:
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    connectionMethod:
                    <input
                        type="text"
                        required
                        value={connectionMethod}
                        onChange={(e) => setConnectionMethod(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    photo:
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0]?.name || '')}
                    />
                </label>
                <br />
                <button type="submit">Créer le student</button>
            </form>
        </div>
    );
};

export default CreerEleve;