import React, { useState } from 'react';
import { URL_DB } from '../../../const/const';

const CreerCours = () => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [location, setLocation] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [isEvening, setIsEvening] = useState(false);
    const [recurrence, setRecurrence] = useState('');
    const [teachers, setTeachers] = useState('');
    const [links, setLinks] = useState('');
    const [students, setStudents] = useState('');
    const [tags, setTags] = useState('');
    const [roomPrice, setRoomPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit called');


        const formData = {
            image,
            title,
            type,
            duration: duration !== '' ? parseInt(duration) : 0, // replace '' with default value
            startDate,
            startTime,
            location,
            roomPrice: roomPrice !== '' ? parseInt(roomPrice) : 0, // replace '' with default value
            maxParticipants: maxParticipants !== '' ? parseInt(maxParticipants) : 0, // replace '' with default value
            paymentType,
            isEvening: 0,
            recurrence: recurrence !== '' ? parseInt(recurrence) : 0, // replace '' with default value
            teachers: teachers.split(',').map(teacher => teacher.trim()),
            links: links ? links.split(',').map(link => link.trim()) : [],
            students: students ? students.split(',').map(student => student.trim()) : [],
            tags,
            // attendance: []
        };

        console.log('FormData:', formData);

        const fetchCours = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return { valid: false };
                }

                console.log('Token:', token);

                const response = await fetch(URL_DB + 'admin/createCourse', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log('Response:', data);
                if (response.ok) {
                    alert('Cours créé avec succès')
                    window.location.href = '/admin/cours';
                }

            } catch (error) {
                console.error('Erreur lors de la création du cours', error);
            }
        };

        fetchCours();
    };

    return (
        <div className='scrollerFormAdmin'>

            <form onSubmit={handleSubmit} className='formAdminCreate'>
                {/* <Header /> */}
                <label>
                    Image:
                </label>
                <input
                    type="file"
                    
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br />
                <label>
                    Title:
                </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>
                    Type:
                </label>
                <input
                    type="text"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <br />
                <label>
                    Duration:
                </label>
                <input
                    type="number"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <br />
                <label>
                    Start Date:
                </label>
                <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <br />
                <label>
                    Start Time:
                </label>
                <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <br />
                <label>
                    Location:
                </label>
                <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <label>
                    Room Price:
                </label>
                <input
                    type="number"
                    required
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(e.target.value)}
                />
                <br />
                <label>
                    Max Participants:
                </label>
                <input
                    type="number"
                    required
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                />
                <br />
                <label>
                    Payment Type:
                </label>
                <input
                    type="text"
                    required
                    placeholder='"ticket" et/ou "card"'
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                />
                <br />
                <br />
                <label>
                    Recurrence:
                </label>
                <input
                    type="number"
                    required
                    value={recurrence}
                    onChange={(e) => setRecurrence(e.target.value)}
                />
                <br />
                <label>
                    Teachers:
                </label>
                <input
                    type="text"
                    required
                    value={teachers}
                    onChange={(e) => setTeachers(e.target.value)}
                />
                <br />
                <label>
                    Links:
                </label>
                <input
                    type="text"
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                />
                <br />
                <label>
                    Students:
                </label>
                <input
                    type="text"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                />
                <br />
                <label>
                    Tags:
                </label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <br />
                <button type="submit">Créer le cours</button>
            </form>
        </div>
    );
};

export default CreerCours;
