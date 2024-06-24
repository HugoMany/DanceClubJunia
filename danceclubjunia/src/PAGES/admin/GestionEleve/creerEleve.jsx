import React, { useState } from 'react';
// import Header from '../elements/header';
// import '../css/login.css';
import { URL_DB } from '../../../const/const';

function CreerEleve() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const connectionMethod = "mail";
    const [photo, setPhoto] = useState('');

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
        };
        console.log('Form Data:', formData);

        const fetchEleve = async () => {
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

                // Vérifiez si le statut de la réponse est 204
                if (response.status === 204) {
                    console.warn('No content returned from the server');
                } else {
                    const data = await response.json();
                    console.log('Response:', data);
                }

            } catch (error) {
                console.error('Erreur lors de la création du student', error);
            }
        };

        fetchEleve();
    };

    return (
        <div className='scrollerFormAdmin'>


            <form onSubmit={handleSubmit}  className='formAdminCreate'>
                <label>
                    Prénom:
                    
                </label>
                <input
                        type="text"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                <br />
                <label>
                    Nom:
                    
                </label>
                <input
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                <br />
                <label>
                    E-Mail:
                   
                </label>
                <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <label>
                    Mot de passe:
                   
                </label>
                <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <label>
                    Photo:
                    
                </label>
                <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0]?.name || '')}
                    />
                <br />
                <button type="submit">Créer le student</button>
            </form>
        </div>
    );
};

export default CreerEleve;
