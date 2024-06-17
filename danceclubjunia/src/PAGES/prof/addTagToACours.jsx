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
//     "tags": "[\"danse\", \"salsa\", \"debutant\"]"
//   };

const AddTagToACours = (idCoursSelected="10") => {
    if (idCoursSelected===10) {
        console.error("ERROR ADMIN SELECT OR NOT SELECTED A COURSE ID")
    }
    const [newTag, setNewTag] = useState('');
    const [cours, setCours] = useState({});
    const [loading,setLoading] = useState(true);
    const handleTagChange = (e) => {
        setNewTag(e.target.value);
    };
    //http://90.110.227.143/api/user/searchCourse?courseID=3

    const fetchCoursesById = () => {
        // console.log('Add tag:', newTag);
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };

        fetch(URL_DB + 'user/searchCourse?courseID=10', {
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

        setNewTag('');
    };
    const handleAddTag = () => {
        // console.log('Add tag:', newTag);
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };

        fetch(URL_DB + 'teacher/addTag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userID: 1,
                courseID: cours.courseID,
                tag: newTag,
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

        setNewTag('');
    };
    const handleRemoveTag = (tagToRemove) => {
        const token = localStorage.getItem('token');
        if (!token) return { valid: false };
    
        fetch(URL_DB + 'teacher/removeTag', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userID: 1,
                courseID: cours.courseID,
                tag: tagToRemove.replace(/[^a-zA-Z0-9]/g, ''),
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data
                console.log(data);
                // Refresh the course data to reflect the removed tag
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
        const tags = cours.tags.split(',');
    return (
        <div>
            <h1>Add Tag to a Course</h1>
            <p>Id cours selectionné: {cours.courseID}</p>
            <div className='addAndDeleteTag'>
                TAGS: <br />
                {tags.map((tag, index) => (
                    <React.Fragment key={index}>
                        {tag}
                        <Button variant="contained" value={tag} onClick={() => handleRemoveTag(tag)}>Supprimer ce tag</Button> <br />
                    </React.Fragment>
                ))}

                <input type="text" placeholder="New Tag" value={newTag} onChange={handleTagChange} />
                <Button variant="contained" onClick={handleAddTag}>Add Tag</Button>
            </div>
        </div>
    );
}
};

export default AddTagToACours;

