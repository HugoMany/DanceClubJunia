import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../elements/header';
import { URL_DB } from '../../const/const';

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'contact', headerName: 'Contact', width: 200 },
  ];

  useEffect(() => {
    const fetchEmailAllStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
        const response = await fetch(URL_DB + 'user/getContactsStudents', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts.map((contact, index) => ({
            id: index,
            contact: contact
          })));
          setLoading(false);
        } else {
          console.error('Erreur lors de la récupération des contacts');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts', error);
      }
    };

    fetchEmailAllStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div style={{ height: "80vh"}}>
        <Header></Header>
        <DataGrid rows={contacts} columns={columns} pageSize={5} />
      </div>
    );
  }
};

export default AllContacts;