import React, { useState } from 'react';
// import Header from '../elements/header';
// import '../css/login.css';
import { URL_DB } from '../../../const/const';

function CreerProf() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');

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
            description
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

                const response = await fetch(URL_DB + 'admin/createTeacher', {
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

        fetchProf();
    };

    return (
        <div className='scrollerFormAdmin'>


            <form onSubmit={handleSubmit}  className='formAdminCreate'>
                <label>
                    firstname:
                    
                </label>
                <input
                        type="text"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                <br />
                <label>
                    surname:
                    
                </label>
                <input
                        type="text"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                <br />
                <label>
                    mail:
                   
                </label>
                <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <label>
                    password:
                   
                </label>
                <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <label>
                    connectionMethod:
                   
                </label>
                <input
                        type="text"
                        required
                        value={connectionMethod}
                        onChange={(e) => setConnectionMethod(e.target.value)}
                    />
                <br />
                <label>
                    photo:
                    
                </label>
                <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0]?.name || '')}
                    />
                <br />
                <label>
                    description:
                   
                </label>
                <input
                        type="text"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                <br />
                <button type="submit">Créer le prof</button>
            </form>
        </div>
    );
};

export default CreerProf;
