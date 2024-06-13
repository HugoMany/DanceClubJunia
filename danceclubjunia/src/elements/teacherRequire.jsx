// import { UxRL_DB } from '../const/const.js';
import React from "react";

function TeacherRequire(redirect = true) {
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    const url = `http://90.110.227.143/api/auth/verifyToken`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.userType === "teacher") {
            return true;
        } else {
            console.log("Vous n'êtes pas un enseignant");
            return false;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du token', error);
    });
        
    }
    export default TeacherRequire;
