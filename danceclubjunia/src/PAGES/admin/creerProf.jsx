import React, { useState } from 'react';

function CreerProf() {
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [mail,setMail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMethod, setConnectionMethod] = useState('');
    const [photo,setPhoto] = useState('');
    const [description, setDescription] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const json = {
            "firstname": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",
            "password": "securepassword123",
            "connectionMethod": "email",
            "userId": "12345",
            "photo": "image.png",
            "description": "A description about John Doe."
        }
        
        // Ajoutez ici la logique pour enregistrer les données du cours
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                firstname :
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </label>
            <br />
            <label>
                surname :
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </label>
            <br />
            <label>
                mail :
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
            </label>
            <br />
            <label>
                password :
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <label>
                connectionMethod :
                <input
                    type="text"
                    value={connectionMethod}
                    onChange={(e) => setConnectionMethod(e.target.value)}
                />
            </label>
            <br />
            <label>
                photo :
                <input
                    type="file"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                />
            </label>
            <br />
            <label>
                description :
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </label>
            <br />
            <button type="submit">Créer le cours</button>
        </form>
    );
}

export default CreerProf;