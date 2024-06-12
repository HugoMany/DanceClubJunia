import React from 'react';
import Header from '../../../elements/header';
import { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import { DataGrid } from '@mui/x-data-grid';
import Loading from '../../../elements/loading';

import { Modal, Button } from '@mui/material';


const AdminProf = () => {
  const [allProfData, setAllProfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openModif, setOpenModif] = useState(false);
  const [openCreer, setOpenCreer] = useState(false);
  const [openSupp, setOpenSupp] = useState(false);


  const handleOpenModif = () => setOpenModif(true);
  const handleCloseModif = () => setOpenModif(false);

  const handleOpenCreer = () => setOpenCreer(true);
  const handleCloseCreer = () => setOpenCreer(false);

  const handleOpenSupp = () => setOpenSupp(true);
  const handleCloseSupp = () => setOpenSupp(false);

  useEffect(() => {
    const fetchAllProf = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return { valid: false };
            const response = await fetch(URL_DB + 'admin/getAllTeachers', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
              },
            });
            if (response.ok) {
                const data = await response.json();
                setAllProfData(data.teachers);
                console.log(data.teachers)

                setLoading(false);

            } else {
                console.error('Erreur lors de la récupération des prof');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des prof', error);
        }
        finally {
        }
  };
  
    

    fetchAllProf();
   
    // console.log(allProfData);
  }, []);
  if(loading){
    return <div><Loading></Loading></div>
  }
  return (
    
    <div>
        <Header title="Admin Prof"></Header>
      {/* <h1>Admin Prof Page</h1> */}
      <div className='DataAdmin'>
      
      {allProfData && (

        <DataGrid
          rows={allProfData}
          getRowId={(row) => row.userID}
          columns={[
            { field: 'userID', headerName: 'ID', width: 90 },
            { field: 'firstname', headerName: 'Prenom', width: 150 },
            { field: 'surname', headerName: 'Nom', width: 150 },
            { field: 'email', headerName: 'Email', width: 150 },
            { field: 'connectionMethod', headerName: 'Méthode de connexion', width: 150 },
            { field: 'photo', headerName: 'Photo', width: 150 ,editable: true,}
          ]}
          onCellEditStop={(params, event) => 
            console.log("Case modifier")
          }
          
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />)}
        </div>
      <Button variant="contained" color="primary" onClick={handleOpenModif}>
        Modifier un prof
      </Button>
      <Modal
        open={openModif}
        onClose={handleCloseModif}
      >
        <>
        Modifier
        </>
      </Modal>

      <Button variant="contained" color="primary" onClick={handleOpenCreer}>
        Créer un prof
      </Button>
      <Modal
        open={openCreer}
        onClose={handleCloseCreer}
      >
        <>
        Créer
        </>
      </Modal>

      <Button variant="contained" color="primary" onClick={handleOpenSupp}>
        Supprimer un prof
      </Button>
      <Modal
        open={openSupp}
        onClose={handleCloseSupp}
      >
        <>
      Supp
        </>
      </Modal>
    </div>
  );
};

export default AdminProf;
