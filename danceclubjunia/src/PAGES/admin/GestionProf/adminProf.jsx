import React from 'react';
import Header from '../../../elements/header';
import { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import { DataGrid } from '@mui/x-data-grid';

const AdminProf = () => {
  const [allProfData, setAllProfData] = useState(null);
  const [loading, setLoading] = useState(true);

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
                console.log(data.students)
                setAllProfData(data.students);
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
   
    console.log(allProfData);
  }, []);
  return (
    <div>
        <Header title="Admin Prof"></Header>
      {/* <h1>Admin Prof Page</h1> */}
      <div className='DataAdmin'>

        <DataGrid
          // rows={allUserData}
          getRowId={(row) => row.userID}
          columns={[
            { field: 'userID', headerName: 'ID', width: 90 },
            { field: 'firstname', headerName: 'Prenom', width: 150 },
            { field: 'surname', headerName: 'Nom', width: 150 },
            { field: 'email', headerName: 'Email', width: 150 },
            { field: 'connectionMethod', headerName: 'Méthode de connexion', width: 150 },
            { field: 'credit', headerName: 'Credit', width: 150 },
            { field: 'ticket', headerName: 'Ticket', width: 150 },
            { field: 'photo', headerName: 'Photo', width: 150 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        </div>
    </div>
  );
};

export default AdminProf;
