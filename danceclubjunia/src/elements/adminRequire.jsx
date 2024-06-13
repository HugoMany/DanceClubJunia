import React from 'react';
import { URL_DB } from '../const/const';

function AdminRequire(redirect = true) {
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    const url = `${URL_DB}auth/verifyToken`;

    return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.userType==="admin"){
                console.log("Vous êtes bien un admin");
                return true;
            }
            else{
                if(redirect){
                    window.location.href = '/error';
                }
                console.log("Vous n'êtes pas un admin");
                return false;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du token', error);
        });
        
    }
    export default AdminRequire;
