import React, { useState, useEffect } from 'react';
import { URL_DB } from '../../../const/const';
import Loading from '../../../elements/loading';
import { useParams } from 'react-router-dom';
// import { idID } from '@mui/material/locale';



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
    const eleveId = idParam;
    console.log(eleveId+'test ID')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eleveData, setEleveData] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    useEffect(() => {
       const FetchEleve = async () => {
           try {
           const token = localStorage.getItem('token');
           if (!token) return { valid: false };
           
           const response = await fetch(`http://90.110.227.143/api/teacher/getStudent?studentID=${eleveId}`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
               },
               });
               console.log(response);
               if (response.ok) {
                const data = await response.json();
                console.log(data)
                
                setEleveData(data);
                setFormData({ 
         
                    teacherID: data.teachersID,
                 // Placeholder, you need to replace this with actual data
                });
                //setTeacherID(filteredCourse.teacherID);
                
               } else {
                   throw new Error('Error fetching eleves 101');
               }
           } catch (error) {
               console.error('Error fetching eleves:', error);
               setError(error);
           } finally {
               setLoading(false);
           }
       };

       FetchEleve();
   },[eleveId]);
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

            console.log(eleveData)
            const eleveDataModify = {
            
            studentID: formData.studentID,
            firstname: formData.firstname,
            surname: formData.surname,
            email: formData.email,
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
                    JSON.stringify(eleveDataModify)
                    
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
    if (error) return <div>Error loading Students: {error.message}</div>;

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
                <h1>Modifier l'eleve' N°{eleveId}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Image du cours:
                        <input type="file" name="photo" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <label>
                        Prénom:
                        <input type="text" name="title" placeholder={formData.firstname || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Nom:
                        <input type="text" name="type" placeholder={formData.surname || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="type" placeholder={formData.email || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Crédit:
                        <input type="number" name="duration" placeholder={formData.credit || ''} onChange={handleChange} />
                    </label>
                    <label>
                        Ticket:
                        <input type="number" name="duration" placeholder={formData.ticket || ''} onChange={handleChange} />
                    </label>
                    
                    <button type="submit">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default ModifEleve;
