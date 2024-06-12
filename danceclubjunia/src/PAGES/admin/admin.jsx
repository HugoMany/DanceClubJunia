import React, { useState } from 'react';
import Header from '../../elements/header';
import '../../css/admin.css';
function Admin() {
    return(
        <div>
        <div className='Admin'>
                           <Header ></Header>

            <h1>Admin</h1>
            <button ><a href='/admin/prof'>Gestion professeur</a><br></br></button>
            <button><a href='/admin/cours'>Gestion cours</a><br></br></button>
            <button><a href='/admin/eleve'>Gestion Eleve</a><br></br></button>
            <button><a href='/admin/eleve'>Gestion Credit</a></button>


        </div>
        </div>
    );
}

export default Admin;
