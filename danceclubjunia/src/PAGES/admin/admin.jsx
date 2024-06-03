import React, { useState } from 'react';
import Header from '../../elements/header';
import '../../css/admin.css';
function Admin() {
    return(
        
        <div className='Admin'>
                           <Header ></Header>

            <h1>Admin</h1>
            <button><a href='/admin/creerProf'>Créer un professeur</a><br></br></button>
            <button><a href='/admin/creerCours'>Créer un cours</a><br></br></button>
            <button><a href='/admin/creerEleve'>Créer un Eleve</a></button>

        </div>
    );
}

export default Admin;
