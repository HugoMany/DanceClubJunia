import React, { useState , useEffect} from 'react';
import { URL_DB } from '../../const/const';
import Loading from '../../elements/loading';
import { Button } from '@mui/material';

// const cours = {
//     "courseID": 15,
//     "image": "image.png",
//     "title": "Cours de danse",
//     "type": "Salsa",
//     "duration": 60,
//     "startDate": "2024-06-06T23:45:00.000Z",
//     "location": "Salle de danse 1",
//     "maxParticipants": 20,
//     "paymentType": "ticket,subscription,card",
//     "isEvening": 0,
//     "recurrence": 7,
//     "teachersID": "[1]",
//     "links": "[\"http://example.com\"]",
//     "studentsID": "[10]",
//     "links": "[\"danse\", \"salsa\", \"debutant\"]"
//   };

const AddlinkToACours = (idCoursSelected) => {
    console.log("AddlinkToACours");
    console.log(idCoursSelected);

    const [newlink, setNewlink] = useState('');
    const [cours, setCours] = useState({});
    const [loading,setLoading] = useState(true);
    const handlelinkChange = (e) => {
        setNewlink(e.target.value);
    };
    //http://90.110.227.143/api/user/searchCourse?courseID=3

    const fetchCoursesById = () => {
        // console.log('Add link:', newlink);
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };

        fetch(URL_DB + 'user/searchCourse?courseID='+idCoursSelected.idCoursSelected, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                setCours(data.courses[0]);
                console.log(data);
                setLoading(false)
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

        setNewlink('');
    };
    const handleAddlink = () => {
        // console.log('Add link:', newlink);
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };

        fetch(URL_DB + 'user/addlink', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userID: 1,
                courseID: cours.courseID,
                link: newlink,
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
                // Refresh the course data to reflect the added link
                window.location.reload();
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

        setNewlink('');
    };
    const handleRemovelink = (linkToRemove) => {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
    
        fetch(URL_DB + 'teacher/removelink', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userID: 1,
                courseID: cours.courseID,
                link: linkToRemove,//.replace(/[^a-zA-Z0-9]/g, '')
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
                // Refresh the course data to reflect the removed link
                fetchCoursesById();
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };
    useEffect(() => {
        fetchCoursesById();
    }, []); 
    if (loading) {
        return <Loading></Loading>
    } else {
        const links = JSON.parse(cours.links); // Parse the JSON string to an array
        return (
            <div>
                <h1>Ajouter un lien à un cours</h1>
                {/* <p>Id cours selectionné: {cours.courseID}</p> */}
                <div className='addAndDeleteTag'>
                    <h3>Liens</h3>
                    {links.map((link, index) => (
                        <React.Fragment key={index}>
                            {link}
                            <Button variant="contained" value={link} onClick={() => handleRemovelink(link)}>Supprimer ce lien</Button> <br />
                        </React.Fragment>
                    ))}
    
                    <input type="text" placeholder="New link" value={newlink} onChange={handlelinkChange} />
                    <Button variant="contained" onClick={handleAddlink}>Ajouter ce lien</Button>
                </div>
            </div>
        );
    }
}
export default AddlinkToACours;

