import React, { useState } from 'react';
import { URL_DB } from '../../const/const';


const cours = {
    "courseID": 15,
    "image": "image.png",
    "title": "Cours de danse",
    "type": "Salsa",
    "duration": 60,
    "startDate": "2024-06-06T23:45:00.000Z",
    "location": "Salle de danse 1",
    "maxParticipants": 20,
    "paymentType": "ticket,subscription,card",
    "isEvening": 0,
    "recurrence": 7,
    "teachersID": "[1]",
    "links": "[\"http://example.com\"]",
    "studentsID": "[10]",
    "tags": "[\"danse\", \"salsa\", \"debutant\"]"
  };

const AddTagToACours = () => {
    const [newTag, setNewTag] = useState('');

    const handleTagChange = (e) => {
        setNewTag(e.target.value);
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
                        <button value={tag}>Supprimer ce tag</button> <br />
                    </React.Fragment>
                ))}

                <input type="text" placeholder="New Tag" value={newTag} onChange={handleTagChange} />
                <button onClick={handleAddTag}>Add Tag</button>
            </div>
        </div>
    );
};

export default AddTagToACours;

