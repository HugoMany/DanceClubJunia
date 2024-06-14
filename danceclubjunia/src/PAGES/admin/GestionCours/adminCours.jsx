import React from 'react';
import Header from '../../../elements/header';
import ModifCours from './modifCours';
import CreerCours from './creerCours';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';

import { Modal, Button } from '@mui/material';
import SupprimerCours from './suppirmerCours';


const AdminCours = () => {
  const [allCoursesData, setAllCoursesData] = useState(null);
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
    const fetchAllCourses = async () => {
        try {
          //Recup TOKEN dans le local storage
          const token = localStorage.getItem('token');
          if (!token) return { valid: false };

            const response = await fetch(URL_DB + 'guest/getAllCourses', {
              method: 'GET',
              headers: {
                        'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.courses)
                setAllCoursesData(data.courses);
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
    

    fetchAllCourses();
   
    console.log(allCoursesData);
}, []);

if (loading) {
    return <Loading />;
}

  return (
    <div>

             <Header title={"Gestion des Cours"}></Header>
      
       
      <div className='DataAdmin'>
        
      {allCoursesData && (

        <DataGrid
          rows={allCoursesData}
          
          getRowId={(row) => row.courseID}
          columns={[
            { field: 'courseID', headerName: 'ID', width: 90 },
            { field: 'image', headerName: 'Prenom', width: 150 },
            { field: 'title ', headerName: 'Nom', width: 150 },
            { field: 'type', headerName: 'Email', width: 150 },
            { field: 'duration', headerName: 'Méthode de connexion', width: 150 },
            { field: 'startDate', headerName: 'Credit', width: 150 },
            { field: 'location', headerName: 'Ticket', width: 150 },
            { field: 'maxParticipants', headerName: 'Ticket', width: 150 },
            { field: 'paymentType', headerName: 'Ticket', width: 150 },
            { field: 'paymentOptions', headerName: 'Ticket', width: 150 },
            { field: 'isEvening', headerName: 'Ticket', width: 150 },
            { field: 'recurrence', headerName: 'Ticket', width: 150 },
            { field: 'teachersID', headerName: 'Ticket', width: 150 },
            { field: 'links', headerName: 'Ticket', width: 150 },
            { field: 'studentsID', headerName: 'Ticket', width: 150 },
            { field: 'tags', headerName: 'Photo', width: 150 },
            {
              field: 'buttonModifier',
              headerName: 'Modifier',
              sortable: false,
              width: 250,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  alert(`Clicked on row with id: ${params.row.courseID}`);
                };
          
                return <Button variant="contained" color="primary" onClick={handleOpenModif}>
                Modifier le cours N°{params.row.courseID}
              </Button>;
              }
            },
            {
              field: 'buttonDelete',
              headerName: 'Delete',
              sortable: false,
              width: 250,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  alert(`Clicked on row with id: ${params.row.courseID}`);
                };
                // idCoursSelected = params.row.courseID;
                // console.log("idCoursSelected"+idCoursSelected);
          
                return    <Button variant="contained" color="primary" onClick={handleOpenSupp}>
                Supprimer le cours N°{params.row.courseID}
              </Button>;
              }
            }
            
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />)}
        </div>
        <Header title="Admin Cours"></Header>
      {/* <h1>Admin Cours</h1> */}




      <Button variant="contained" color="primary" onClick={handleOpenCreer}>
        Créer un cours
      </Button>

      
      <Modal
        open={openModif}
        onClose={handleCloseModif}
      >
        <ModifCours idCours={7} />
      </Modal>

    
      <Modal
        open={openCreer}
        onClose={handleCloseCreer}
      >
        <CreerCours />
      </Modal>

   
      <Modal
        open={openSupp}
        onClose={handleCloseSupp}
      >
       <SupprimerCours idCours={3}>

       </SupprimerCours>
      </Modal>

      

    </div>
  );
};

export default AdminCours;
