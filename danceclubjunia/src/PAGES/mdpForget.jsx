import React, { useState } from 'react';
import { URL_DB } from '../const/const';
import Header from '../elements/header';
import { Button } from '@mui/material';
const MdpForget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const [buttonEtat, setButtonEtat] = useState('true');

    const generateResetToken = async () => {
        setButtonEtat(setButtonEtat("false"))
        try {
            const response = await fetch(URL_DB+'guest/generateResetToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setMessage("Un email a été envoyé à l'adresse indiquée")
                setButtonEtat(setButtonEtat("contained"))
            } else {
                const error = await response.json();
                setMessage(error.message);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                setButtonEtat("contained");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erreur');
        }
    };

    return (
        <div>
        <div className='forget'>
            <Header titre="Page de Mot de Passe Oublié"></Header>
            <h1>Page de Mot de Passe Oublié</h1>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            {buttonEtat === "true" && (
            <Button variant="contained" color="primary" onClick={generateResetToken}>Envoi de l'email de récupération

            </Button>
            )}

            {message && <p>{message}</p>}
        </div>

        </div>
    );
};

export default MdpForget;