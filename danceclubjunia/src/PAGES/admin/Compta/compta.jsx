import {React,useEffect,useState} from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { ButtonProps } from '@mui/material/Button';
import Header from '../../../elements/header';
import {fetchAllCourses,fetchAllUser,fetchAllProf, fetchAllPayments} from './fetchEverything';

// Define your columns
const columns = [
  { field: 'paymentID', headerName: 'Payment ID', width: 130 },
  { field: 'userID', headerName: 'User ID', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'paymentType', headerName: 'Payment Type', width: 130 },
  { field: 'sourceID', headerName: 'Source ID', width: 130 },
  { field: 'itemID', headerName: 'Item ID', width: 130 },
];

export default function CustomExport() {
  const [dataPayments, setDataPayments] = useState([]);

  useEffect(() => {
    fetchAllPayments().then((data) => {setDataPayments(data)});
  }, []); 

  return (
    <div>
      <Header></Header>
      <div className='paimentsTable'>
        <DataGrid rows={dataPayments} columns={columns} slots={{ toolbar: CustomToolbar }}   getRowId={(row) => row.paymentID} checkboxSelection/>
      </div>
    </div>
  );
}

const csvOptions: GridCsvExportOptions = { delimiter: ';' };

function CustomExportButton(props: ButtonProps) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
    </GridToolbarExportContainer>
  );
}

function CustomToolbar(props: GridToolbarContainerProps) {
  return (
    <GridToolbarContainer {...props}>
      <CustomExportButton />
    </GridToolbarContainer>
  );
}