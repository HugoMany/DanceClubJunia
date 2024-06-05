import React, { useState } from 'react';
import Header from '../../../elements/header';
import URL_DB from '../../../const/const';

const CreerProf = () => {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo, setPhoto] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            firstname === '' ||
            surname === '' ||
            mail === '' ||
            password === '' ||
            connectionMethod === '' ||
            photo === '' ||
            description === ''
        ) {
            alert('Please fill in all fields');
            return;
        }
        const formData = {
            firstname,
            surname,
            mail,
            password,
            connectionMethod,
            photo,
            description
        };

        console.log('Form Data:', formData);

        // Envoyer les données à l'API ou les traiter comme nécessaire
        // Exemple d'envoi via fetch:
        fetch(URL_DB+'/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
        <form onSubmit={handleSubmit}>
            <Header></Header>
            <label>
                firstname:
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </label>
            <br />
            <label>
                surname:
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </label>
            <br />
            <label>
                mail:
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
            </label>
            <br />
            <label>
                password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <label>
                connectionMethod:
                <input
                    type="text"
                    value={connectionMethod}
                    onChange={(e) => setConnectionMethod(e.target.value)}
                />
            </label>
            <br />
            <label>
                photo:
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0].name)}
                />
            </label>
            <br />
            <label>
                description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </label>
            <br />
            <button type="submit">Créer le prof</button>
        </form>
    </div>
    );
};

export default CreerProf;
