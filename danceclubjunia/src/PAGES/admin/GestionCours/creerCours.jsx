import React, { useState } from 'react';
import Header from '../../../elements/header';
import URL_DB from '../../../const/const';

function CreerCours() {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [location, setLocation] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [price, setPrice] = useState('');
    const [paymentOptions, setPaymentOptions] = useState('');
    const [isEvening, setIsEvening] = useState(false);
    const [recurrence, setRecurrence] = useState('');
    const [teachers, setTeachers] = useState('');
    const [links, setLinks] = useState('');
    const [students, setStudents] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            image === '' ||
            title === '' ||
            type === '' ||
            duration === '' ||
            startDate === '' ||
            startTime === '' ||
            location === '' ||
            maxParticipants === '' ||
            paymentType === '' ||
            price === '' ||
            paymentOptions === '' ||
            recurrence === '' ||
            teachers === '' ||
            links === '' ||
            tags === ''
        ) {
            alert('Please fill in all fields');
            return;
        }

        const json = {
            image,
            title,
            type,
            duration,
            startDate,
            startTime,
            location,
            maxParticipants,
            paymentType,
            price,
            paymentOptions: paymentOptions.split(','), // Assume paymentOptions is a comma-separated string
            isEvening,
            recurrence,
            teachers, // Assume teachers is a JSON string
            links, // Assume links is a JSON string
            students: 0, // Assume students is a JSON string
            tags: tags.split(',') // Assume tags is a comma-separated string
        };

        console.log('Form Data:', json);

        // Add logic to save course data
        fetch( URL_DB+'admin/createCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className='Form'>
            <Header></Header>
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" value={image} onChange={(e) => setImage(e.target.value)} />

            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <label htmlFor="type">Type:</label>
            <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />

            <label htmlFor="duration">Duration:</label>
            <input type="time" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />

            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label htmlFor="startTime">Start Time:</label>
            <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="maxParticipants">Max Participants:</label>
            <input type="number" id="maxParticipants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} />

            <label htmlFor="paymentType">Payment Type:</label>
            <input type="text" id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} />

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label htmlFor="paymentOptions">Payment Options (comma separated):</label>
            <input type="text" id="paymentOptions" value={paymentOptions} onChange={(e) => setPaymentOptions(e.target.value)} />

            <label htmlFor="isEvening">Is Evening:</label>
            <input type="checkbox" id="isEvening" checked={isEvening} onChange={(e) => setIsEvening(e.target.checked)} />

            <label htmlFor="recurrence">Recurrence:</label>
            <input type="text" id="recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value)} />

            <label htmlFor="teachers">Teachers :</label>
            <input type="text" id="teachers" value={teachers} onChange={(e) => setTeachers(e.target.value)} />

            <label htmlFor="links">Links :</label>
            <input type="text" id="links" value={links} onChange={(e) => setLinks(e.target.value)} />

            <label htmlFor="tags">Tags (comma separated):</label>
            <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />

            <button type="submit">Créer un cours</button>
        </form>
    );
}

export default CreerCours;
