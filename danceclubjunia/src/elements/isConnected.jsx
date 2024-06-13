// import { UxRL_DB } from '../const/const.js';

function isConnected() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const url = `http://90.110.227.143/api/auth/verifyToken`;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if(data.message==="Token is valid"){
            console.log("Vous êtes bien connecté");
            return true;
        }
        else{
            return false;
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération du token', error);
    });
    
}

export default isConnected;
