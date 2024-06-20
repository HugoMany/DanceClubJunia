import {React,useEffect,useState} from 'react';
import { URL_DB } from '../../const/const';
import Header from '../../elements/header';
const ReturnStudentsProfil = (idCoursSelected) => {
    const [students, setStudents] = useState([]);
    console.log("ReturnStudentsProfil");
    console.log(idCoursSelected);
    useEffect(() => {
        const fetchAllUserFromCours = async () => {
            try {
              const token = localStorage.getItem('token');
              if (!token) return { valid: false };
              console.log(idCoursSelected.idCoursSelected);
                const response = await fetch(URL_DB + 'teacher/getStudentsInCourse?userID=1&courseID='+idCoursSelected.idCoursSelected, {
                    method: 'GET',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                  },
                });
                if (response.status === 504) {
                  setStudents("Il n'y a pas d'élève dans le cours.");
                }
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.students)
                    setStudents(data.students);
    
                } else {
                    console.error('Erreur lors de la récupération des prof');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des prof', error);
            }
            finally {
            }
        };
        
    
        fetchAllUserFromCours();
            
    }, []);

  return (
    <div>
        {/* <Header title={"Return Students Profile"}></Header> */}
      <h1>Return Students Profile</h1>
    <div>
        {/* Add your JSX content here */}
        {students === "Il n'y a pas d'élève dans le cours." ? (
          <div>{students}</div>
        ) : (
          students.map((student) => (
            <div key={student.id}>{student.name}</div>
          ))
        )}
    </div>
      
      {/* Add your JSX content here */}
    </div>
  );
};

export default ReturnStudentsProfil;
