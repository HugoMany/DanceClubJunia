import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL_DB } from '../const/const';
import Header from '../elements/header';
import { Button } from '@mui/material';

const MdpRecovery = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(''); 
    const [buttonEtat, setButtonEtat] = useState("true");

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setButtonEtat("false");
        try {
            const response = await fetch(URL_DB+'guest/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setMessage("Password reset successfully");
                window.location.href = '/connexion';
                
            } else {
                const error = await response.json();
                setMessage(error.message);
                alert("Error resetting password");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                setButtonEtat("contained");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error resetting password');
        }
    };

    return (
        <div>
        <div className='forget'>
            <Header titre="Page de Réinitialisation du Mot de Passe"></Header>
            <h1>Page de Réinitialisation du Mot de Passe</h1>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            {buttonEtat === "true" && (
                <Button variant="contained" color="primary" onClick={resetPassword}>
                    Réinitialiser le Mot de Passe
                </Button>
            )}
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default MdpRecovery;