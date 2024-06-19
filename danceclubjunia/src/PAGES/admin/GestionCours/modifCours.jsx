import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { useParams } from 'react-router-dom';
// import { idID } from '@mui/material/locale';
import Header from '../../../elements/header';


const showLoading = () => {
    // Placeholder for actual showLoading implementation
    console.log('Loading...');
};

// const hideLoading = () => {
//     // Placeholder for actual hideLoading implementation
//     console.log('Loading complete.');
// };

// Start loading
showLoading();

const ModifCours = () => {
    const { idParam } = useParams();
    const courseId = idParam;
    console.log(courseId+'test ID')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    //const [teacherID, setTeacherID] = useState(null);
    useEffect(() => {
       const FetchCourses = async () => {
           try {
           const token = localStorage.getItem('token');
           if (!token) return { valid: false };
           
           const response = await fetch(`http://90.110.227.143/api/guest/getAllCourses`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
               },
               });
               console.log(response);
               if (response.ok) {
                const data = await response.json();
                console.log(data)
                const filteredCourse = data.courses.find(course => course.courseID ===  parseInt(courseId, 10));
                setCourseData(filteredCourse);
                console.log(filteredCourse.teachersID);
                setFormData({ 
                    ...filteredCourse, 
                    teacherID: filteredCourse.teachersID,
                    teachers: filteredCourse.teachers, // Placeholder, you need to replace this with actual data
                    links: filteredCourse.link, // Placeholder, you need to replace this with actual data
                    students: filteredCourse.students, // Placeholder, you need to replace this with actual data
                });
                //setTeacherID(filteredCourse.teacherID);
                console.log(filteredCourse)
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

       FetchCourses();
   },[courseId]);
   console.log(formData);


    // useEffect(() => {
    //     const fetchCours = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) return { valid: false };
    //             console.log(token)
    //             const response = await fetch(URL_DB + 'user/searchCourse?courseID=' + idCours, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });
    //             const data = await response.json();
    //             setCourseData(data);
    //             setLoading(false);
    //             hideLoading();
    //         } catch (error) {
    //             console.error('Erreur lors de la récupération des info du cours', error);
    //             hideLoading();
    //         }
    //     };
    //     fetchCours();
    // }, [idCours]);

    const handleSubmit = async (event) => {
        console.log("ooooo")
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };

            console.log(courseData)
            const courseDataModify = {
            
            teacherID: 1,
            courseID: formData.courseID,
            image: formData.image,
            title: formData.title,
            type: formData.type,
            duration: formData.duration,
            startDate: formData.startDate,
            startTime: formData.startTime,
            location: formData.location,
            maxParticipants: formData.maxParticipants,
            paymentType: formData.paymentType,
            isEvening: formData.isEvening,
            recurrence: formData.recurrence,
            teachers: formData.teachers,
            links: formData.links,
            students: formData.students,
            tags: formData.tags
            };

            
            const response = await fetch(URL_DB + `teacher/modifyCourse`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: 
                    JSON.stringify(courseDataModify)
                    
                ,
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
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        setFormData(prevState => ({
            ...prevState,
            image: URL.createObjectURL(file)
        }));
    };

    if (loading) {
        return <Loading/>;
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
        <div id='modifAdmin' >
            <Header></Header>
            <div >
                <h1>Modifier le cours N°{courseId}</h1>
                <form onSubmit={handleSubmit}  className='formAdminCreate'>
                    <label>
                        Image du cours:
                    </label>
                    <input type="file" name="image" accept="image/*" onChange={handleImageChange} />

                    <label>
                        Titre du cours:
                    </label>
                    <input type="text" name="title" placeholder={formData.title || ''} onChange={handleChange} />

                    <label>
                        Type de danse:
                    </label>
                    <input type="text" name="type" placeholder={formData.type || ''} onChange={handleChange} />

                    <label>
                        Durée:
                    </label>
                    <input type="number" name="duration" placeholder={formData.duration || ''} onChange={handleChange} />

                    <label>
                        Jour du cours:
                    </label>
                    <input type="date" name="startDate" placeholder={formData.startDate || ''} onChange={handleChange} />

                    <label>
                        Heure du cours:
                    </label>
                    <input type="time" name="startTime" placeholder={formData.startTime || ''} onChange={handleChange} />

                    <label>
                        Lieu du cours:
                    </label>
                    <input type="text" name="location" placeholder={formData.location || ''} onChange={handleChange} />

                    <label>
                        Nombre max de participants:
                    </label>
                    <input type="number" name="maxParticipants" placeholder={formData.maxParticipants || ''} onChange={handleChange} />

                    <label>
                        Est-ce une soirée :
                    </label>
                    <input type="checkbox" name="isEvening" checked={formData.isEvening || false} onChange={(e) => setFormData(prevState => ({ ...prevState, isEvening: e.target.checked }))} />

                    <label>
                        Récurrence:
                    </label>
                    <input type="number" name="recurrence" placeholder={formData.recurrence || ''} onChange={handleChange} />

                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifCours;
