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

const ModifEleve = () => {
    const { idParam } = useParams();
    const studentId = idParam;
    console.log(studentId+'test ID')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    //const [teacherID, setTeacherID] = useState(null);
    useEffect(() => {
       const FetchStudent = async () => {
           try {
           const token = localStorage.getItem('token');
           if (!token) return { valid: false };
           
           const response = await fetch(URL_DB+`guest/getAllCourses`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
               },
               });
               console.log(response);
               if (response.ok) {
                const data = await response.json();
                console.log(data)
                
                
                setFormData({ 
                    ...data, 
                });
                //setTeacherID(filteredCourse.teacherID);
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

       FetchStudent();
   },[studentId]);
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

            
            const studentDataModify = {
            
            studentID: parseInt(studentId,10),
            firstname: formData.firstname,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            connectionMethod: formData.connectionMethod,
            credit: formData.credit,
            photo: formData.photo,
            };

            
            const response = await fetch(URL_DB + `teacher/modifyStudent`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: 
                    JSON.stringify(studentDataModify)
                    
                ,
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l eleve');
            }
            alert('Eleve mis à jour avec succès');
            window.location.href = '/admin/eleve';
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l eleve', error);
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
            photo: URL.createObjectURL(file)
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
                <h1>Modifier l'élève N°{studentId}</h1>
                <form onSubmit={handleSubmit}  className='formAdminCreate'>
                    <label>
                        Photo:
                    </label>
                    <input type="file" name="photo" accept="image/*" onChange={handleImageChange} />

                    <label>
                        Préom de l'élève:
                    </label>
                    <input type="text" name="firstname" placeholder={formData.firstname || ''} onChange={handleChange} />

                    <label>
                        Nom de l'élève:
                    </label>
                    <input type="text" name="surname" placeholder={formData.surname || ''} onChange={handleChange} />

                    <label>
                        email:
                    </label>
                    <input type="texte" name="email" placeholder={formData.email || ''} onChange={handleChange} />

                    <label>
                        Crédit:
                    </label>
                    <input type="number" name="credit" placeholder={formData.credit || ''} onChange={handleChange} />

                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifEleve;
