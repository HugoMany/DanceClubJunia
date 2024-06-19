import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridCsvExportOptions,
  GridExportMenuItemProps,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridApi,
} from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import { ButtonProps } from '@mui/material/Button';
import Header from '../../../elements/header';

// Define your columns
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'courseID', headerName: 'Course ID', width: 130 },
  { field: 'title', headerName: 'Course Title', width: 130 },
  { field: 'type', headerName: 'Course Type', width: 130 },
  { field: 'duration', headerName: 'Duration', width: 130 },
  { field: 'startDate', headerName: 'Start Date', width: 130 },
  { field: 'paymentType', headerName: 'Payment Type', width: 130 },
  { field: 'paymentOptions', headerName: 'Payment Options', width: 130 },
];

// Define your rows
const rows = [
  {
    id: 1,
    courseID: 'COURSE_001',
    title: 'Accounting Basics',
    type: 'Online',
    duration: '30 hours',
    startDate: '2022-01-01',
    paymentType: 'Credit Card',
    paymentOptions: 'Installments',
  },
  // Add more rows as needed
];

// The rest of your code remains the same...

export default function CustomExport() {
  return (
    <div>
      <Header></Header>
      <div style={{ width: '100%' }}>
        <DataGrid rows={rows} columns={columns} slots={{ toolbar: CustomToolbar }} />
      </div>
    </div>
  );
}

const csvOptions: GridCsvExportOptions = { delimiter: ';' };

function CustomExportButton(props: ButtonProps) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
      {/* <JsonExportMenuItem /> */}
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

