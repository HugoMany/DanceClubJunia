import React from 'react';
import { URL_DB } from '../const/const';

function ConnexionRequire() {
    const token = localStorage.getItem('token');
    // if (!token) return { valid: false };
    const url = `${URL_DB}auth/verifyToken`;

    return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.message==="Token is valid"){
                console.log("Vous êtes bien un connexion");
                return true;
            }
            else{
                window.location.href = "/";
                console.log("Vous n'êtes pas un connexion");
                return false;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du token', error);
        });
        
    }
    export default ConnexionRequire;
