import React, { useState } from 'react';
import Header from '../../elements/header';
function Admin() {
    return(
        
        <div>
                           <Header ></Header>

            <h1>Admin</h1>
            <a href='/admin/creerProf'>Créer un professeur</a><br></br>
            <a href='/admin/creerCours'>Créer un cours</a>
        </div>
    );
}

export default Admin;
