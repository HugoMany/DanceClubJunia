import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { idID } from '@mui/material/locale';

const showLoading = () => {
    // Placeholder for actual showLoading implementation
    console.log('Loading...');
};

const hideLoading = () => {
    // Placeholder for actual hideLoading implementation
    console.log('Loading complete.');
};

// Start loading
showLoading();

const ModifCours = ({ idCours }) => {
    
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState(null);
    
    useEffect(() => {
       const fetchCourses = async () => {
           try {
           const token = localStorage.getItem('token');
           if (!token) return { valid: false };
           
           const response = await fetch(`${URL_DB}guest/getAllCourses`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
               },
               });
               console.log(response);
               if (response.ok) {
                   const data = await response.json();
                   console.log(data);
                   const filteredCourse = data.courses.find(course => course.courseID === idCours);
                   console.log(idCours+'OO')
                   console.log(filteredCourse);
                   setCourseData(filteredCourse);
               } else {
                   throw new Error('Error fetching courses 101');
               }
           } catch (error) {
               console.error('Error fetching courses:', error);
               setError(error);
           } finally {
               setLoading(false);
           }
       };

       fetchCourses();
   },[idCours]);
    useEffect(() => {
        const fetchCours = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return { valid: false };
                console.log(token)
                const response = await fetch(URL_DB + 'user/searchCourse?courseID=' + idCours, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setCourseData(data);
                setLoading(false);
                hideLoading();
            } catch (error) {
                console.error('Erreur lors de la récupération des info du cours', error);
                hideLoading();
            }
        };
        fetchCours();
    }, [idCours]);

    const handleSubmit = async (event) => {
        console.log("ooooo")
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            console.log(token)
            console.log(courseData)
            let courseDataModify = {
                ...courseData.courses[0],
                teacherID: "1",
                type:"rock" // A modifier
            };

            
            console.log(courseDataModify)

            const response = await fetch(URL_DB + `teacher/modifyCourse`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(courseDataModify),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour du cours');
            }
            alert('Cours mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cours', error);
        }
    };

    const handleChange = (event) => {
        setCourseData(prevState => ({
            ...prevState,
        }));
    };

    if (loading) {
        return <Loading></Loading>;
    }
    
    
    if (loading){}
    if (error) return <div>Error loading courses: {error.message}</div>;

    return (
        // <div className='ModalAdminGrid'>
        //     <div>
        //     <h1>Modifier le cours N°{idCours}</h1>
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             Type de danse:
        //             <input type="text" name="type" placeholder={courseData.type} onChange={handleChange} />
        //         </label>
        //         {/* Ajoutez d'autres champs de formulaire ici pour les autres propriétés du cours */}
        //         <button type="submit">Mettre à jour</button>
        //     </form>
        //     </div>
        // </div>
        <div className='ModalAdminGrid'>
            <div>
            <h1>Modifier le cours N°{idCours}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    image du cours:
                    <input type="file" name="image" accept="image/*" placeholder="Placez la nouvelle image" onChange={handleChange}/>
                </label>
                <label>
                    Titre du cours:
                    <input type="text" name="title" placeholder={courseData.title} onChange={handleChange}/>
                </label>
                <label>
                    Type de danse:
                    <input type="text" name="type" placeholder={courseData.type} onChange={handleChange}/>
                </label>
                <label>
                    Durée:
                    <input type="number" name="durée du cours" placeholder={courseData.duration} onChange={handleChange}/>
                </label>
                <label>
                    Jour du cours:
                    <input type="date" name="jour du cours" placeholder={courseData.startDate} onChange={handleChange}/>
                </label>
                <label>
                    Heure du cours:
                    <input type="time" name="heurs du cours" placeholder={courseData.startTime} onChange={handleChange}/>
                </label>
                <label>
                    Lieu du cours:
                    <input type="text" name="lieu du cours" placeholder={courseData.location} onChange={handleChange}/>
                </label>
                <label>
                    Nombre max de participants:
                    <input type="Number" name="nombre max de participants" placeholder={courseData.maxParticipants} onChange={handleChange}/>
                </label>
                <label>
                    Est-ce une soirée :
                    <input type="boolean" name="soiree?" placeholder={courseData.isEvening} onChange={handleChange}/>
                </label>
                <label>
                    récurrence:
                    <input type="Number" name="recurrence" placeholder={courseData.recurrense} onChange={handleChange}/>
                </label>
                
                
                <button type="submit">Mettre à jour</button>
            </form>
            </div>
        </div>
    );
};

export default ModifCours;
