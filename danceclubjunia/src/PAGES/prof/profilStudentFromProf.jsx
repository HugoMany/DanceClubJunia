import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import isTeacher from '../../elements/isTeacher';
import { URL_DB } from '../../const/const';
import Header from '../../elements/header';
const ProfilStudentFromProf = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return { valid: false };
    if (!isTeacher()) {
      window.location.href = '/not-authorized';
    } else {
      fetch(URL_DB+`teacher/getStudent?studentID=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setStudent(data.student);
          } else {
            // Handle error here
          }
        });
    }
  }, [id]);

  return (
    <div>
        <Header></Header>
        {student && (
        <div>
          <h1>{student.firstname} {student.surname}</h1>
          <p>Email: {student.email}</p>
          {/* <p>Connection Method: {student.connectionMethod}</p> */}
          <p>Tickets: {student.tickets}</p>
          <img src={student.photo} alt={`${student.firstname} ${student.surname}`} />
        </div>
      )}
    </div>
  );
};

export default ProfilStudentFromProf;