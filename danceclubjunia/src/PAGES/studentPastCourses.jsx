import React, { useState, useEffect } from 'react';
import { URL_DB } from '../const/const';
import Loading from '../elements/loading';

const StudentPastCourses = ({ studentId }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPastCourses = async () => {
            try {
                //Recup TOKEN dans le local storage
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };

                const response = await fetch(`${URL_DB}student/getCourses?studentID=${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                  },
                    
                    
                });

                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses);
                    setLoading(false);
                    console.log(data.courses);
                } else {
                    console.error('Erreur lors de la récupération des cours terminés');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des cours terminés', error);
            }
        };

        fetchPastCourses();
    }, []);

    // Filtrer les cours passés
    let pastCourses = [];
    if(Array.isArray(courses)) {
        pastCourses = courses.filter(course => new Date(course.startDate) < new Date());
    }

    if (loading) {
        return <Loading></Loading>;
      }
    return (
        <div>
            {pastCourses.map(course => (
                    <a href={'/cours/' + course.courseId + '/1/'} className='courseA'>
                    <div class="coursesCase" key={course.courseId}>
                        <div className='divImageCoursSuivanteHomePage'>
                        <div className='imageCoursSuivanteHomePage'><img src={"https://gap.asptt.com/files/2021/08/salsa.png"} alt={course.title} /></div>
                        </div>
                        <div className='timeCoursSuivantHomePage'>                        
                            <h5>{course.title}</h5>
                            <p>{new Date(course.startDate).toLocaleString()}</p>
                            <p>{course.startTime}</p>
                        </div>
                        <div className='typeEtProfCoursSuivantHomePage'>
                            <p>{course.type}</p>
                            <p>{course.teachersID}</p>
                        </div>

                    </div>
                    </a>
                ))}
        </div>
    );
};


export default StudentPastCourses;
