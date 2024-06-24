import React from 'react';
import Header from '../../../elements/header';
import ModifEleve from './modifEleve';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';

import { Modal, Button } from '@mui/material';

import CreerEleve from './creerEleve';

import AdminRequire from '../../../elements/isAdmin';

const AdminEleve = () => {
  AdminRequire()
  const [allUserData, setAllUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const [openCreer, setOpenCreer] = useState(false);
  
  const handleOpenCreer = () => setOpenCreer(true);
  const handleCloseCreer = () => setOpenCreer(false);

  useEffect(() => {
    const fetchAllUser = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return { valid: false };
            const response = await fetch(URL_DB + 'admin/getAllStudents', {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.students)
                setAllUserData(data.students);
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
    

    fetchAllUser();
   
    console.log(allUserData);
    
}, []);
  if(loading){
    return <div><Loading></Loading></div>
  }
  return (
    
    <div>
{/* {allUserData} */}

      
      <Header title={"Gestion des élèves"}></Header>
      
       
      <div className='DataAdmin'>

        <DataGrid
          rows={allUserData}
          getRowId={(row) => row.userID}
          columns={[
            { field: 'userID', headerName: 'ID', width: 90 },
            { field: 'firstname', headerName: 'Prenom', width: 150 },
            { field: 'surname', headerName: 'Nom', width: 150 },
            { field: 'email', headerName: 'Email', width: 150 },
            { field: 'connectionMethod', headerName: 'Méthode de connexion', width: 150 },
            // { field: 'credit', headerName: 'Credit', width: 150 },
            // { field: 'ticket', headerName: 'Ticket', width: 150 },
            { field: 'photo', headerName: 'Photo', width: 150 },
            {
              field: 'buttonModifier',
              headerName: 'Modifier',
              sortable: false,
              width: 250,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                const onClick = () => {
                  alert(`Clicked on row with id: ${params.row.userID}`);
                };
          
                return <a href={"/admin/student/modif/"+params.row.userID}><Button variant="contained" color="primary">
                Modifier l'eleve N°{params.row.userID}
              </Button></a>;
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
                  alert(`Clicked on row with id: ${params.row.userID}`);
                };
                // idCoursSelected = params.row.courseID;
                // console.log("idCoursSelected"+idCoursSelected);
          
                return   <a href={"/admin/student/supp/"+params.row.userID}><Button variant="contained" color="primary">
                Supprimer l'eleve N°{params.row.userID}
              </Button></a>;
              }
            }
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />

</div>


   

      <Button variant="contained" color="primary" onClick={handleOpenCreer}>
        Créer un eleve
      </Button>
      <Modal
        open={openCreer}
        onClose={handleCloseCreer}
      >
       <CreerEleve></CreerEleve>
      </Modal>

    </div>
  );
};

export default AdminEleve;
    