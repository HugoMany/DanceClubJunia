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

import AdminRequire from '../../../elements/isAdmin';
const AdminCours = () => {
  const [allCoursesData, setAllCoursesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openCreer, setOpenCreer] = useState(false);

  const handleOpenCreer = () => setOpenCreer(true);
  const handleCloseCreer = () => setOpenCreer(false);




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

AdminRequire()

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
            { field: 'image', headerName: 'Image', width: 150 },
            { field: 'title ', headerName: 'Titre', width: 150 },
            { field: 'type', headerName: 'Type', width: 150 },
            { field: 'duration', headerName: 'Durée', width: 150 },
            { field: 'startDate', headerName: 'dateDeDebut', width: 150 },
            { field: 'location', headerName: 'localisation', width: 150 },
            { field: 'maxParticipants', headerName: 'Participants Max', width: 150 },
            { field: 'paymentType', headerName: 'Paiement Type', width: 150 },
            { field: 'paymentOptions', headerName: 'Option de paiement', width: 150 },
            { field: 'isEvening', headerName: 'Est une soirée', width: 150 },
            { field: 'recurrence', headerName: 'Recurrent', width: 150 },
            { field: 'teachersID', headerName: 'Prof ID', width: 150 },
            { field: 'links', headerName: 'Liens', width: 150 },
            { field: 'studentsID', headerName: 'Eleve ID', width: 150 },
            { field: 'tags', headerName: 'Tags du Cours', width: 150 },
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
          
                return (
                <>
               
                <a href={'/admin/cours/modifCours/'+params.row.courseID}>
                <Button variant="contained" color="primary" >
                Modifier le cours N°{params.row.courseID}
              </Button>
              </a>

                </>
              
              )
              }
            },
            {
              field: 'buttonDelete',
              headerName: 'Supprimer',
              sortable: false,
              width: 250,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  alert(`Clicked on row with id: ${params.row.courseID}`);
                };
                // idCoursSelected = params.row.courseID;
                // console.log("idCoursSelected"+idCoursSelected);
          
                return (  
                  <> 
                <a href={'/admin/cours/supp/'+params.row.courseID}>
                <Button variant="contained" color="primary">
                Supprimer le cours N°{params.row.courseID}
                </Button>
                </a>
              </>
               )
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
        open={openCreer}
        onClose={handleCloseCreer}
      >
        <CreerCours />
      </Modal>
      
      

    
     


      

    </div>
  );
};

export default AdminCours;
