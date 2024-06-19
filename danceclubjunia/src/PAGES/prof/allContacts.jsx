import {React, useEffect, useState} from 'react';
import Loading from '../../elements/loading';
import { URL_DB } from '../../const/const';
import Header from '../../elements/header';

const AllContacts = () => {
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    setStudent(data.contacts.map((contact, index) => ({
                        id: index,
                        contact: contact
                    })));
                    setLoading(false);
                } else {
                    console.error('Erreur lors de la récupération des cours');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours', error);
            }
        };

        fetchEmailAllStudents();
    }, []);

    if(loading){
        return <Loading></Loading>
    }
    else{
        return (
            <div>
                <Header></Header>
                <div style={{ width: '100%' }}>
                    {student.map((contact) => (
                        <div key={contact.id}>
                            <p>{contact.contact}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default AllContacts;