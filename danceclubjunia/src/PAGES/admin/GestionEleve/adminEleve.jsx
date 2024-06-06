import React from 'react';
import Header from '../../../elements/header';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';



const AdminEleve = () => {
  return (
    <div>
      <Header title={"Gestion des élèves"}></Header>
      <Box sx={{width: '100%' }}>
        <DataGrid
          rows={[
            { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
            { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
            { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
            { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
            { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
            { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
            { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
            { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
            { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
          ]}
          columns={[
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'firstName', headerName: 'First name', width: 150 },
            { field: 'lastName', headerName: 'Last name', width: 150 },
            {
              field: 'age',
              headerName: 'Age',
              type: 'number',
              width: 110,
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default AdminEleve;
    