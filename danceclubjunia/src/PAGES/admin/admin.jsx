import React, { useEffect, useState } from 'react';
import Header from '../../elements/header';
import '../../css/admin.css';
import { Button } from '@mui/material';
import AdminRequire from '../../elements/requireAdmin';
function Admin() {
    useEffect(() => {
        AdminRequire();
    }, []);
    return(
        <div>
            
        <div className='Admin' >
                           <Header title={"Admin"} ></Header>

            <h1>Admin</h1>
            <hr />
            <Button variant="contained" color="primary"><a href='/admin/prof'>Gestion professeur</a><br></br></Button>
            <Button variant="contained" color="primary"><a href='/admin/cours'>Gestion cours</a><br></br></Button>
            <Button variant="contained" color="primary"><a href='/admin/eleve'>Gestion Eleve</a><br></br></Button>
            <Button variant="contained" color="primary"><a href='/admin/compta'>Comptabilité</a></Button>
            <Button variant="contained" color="primary"><a href='/admin/abo'>Tickets et Cartes</a></Button>


        </div>
        </div>
    );
}

export default Admin;
