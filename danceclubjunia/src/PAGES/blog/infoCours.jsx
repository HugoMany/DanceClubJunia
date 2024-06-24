import React,{ useEffect, useState } from 'react';
import Header from '../../elements/header';
import "../../css/blog.css"
import { URL_DB } from '../../const/const';
function InfoCours({ title, content, image }) {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch(URL_DB+'guest/getContactsTeachers', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // body data type must match "Content-Type" header
        })
        .then(response => response.json())
        .then(data => setContacts(data.contacts));
    }, []);

    return (
        <div className='blogGlobal'>
            <Header></Header>
            <div className='blogCoursDance'>
            <img src={image} alt="" />
            <h1>{title}</h1>
            {content}
            <h3>Nos professeurs de danse.</h3>
            <ul className='profContact'>
                {contacts.map((contact, index) => (
                    <li key={index}>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </li>
                ))}
            </ul>
            <p>Rejoignez-nous et laissez-vous emporter par le rythme et l'expression de la danse moderne !</p>
                <br /><br />
            </div>
            
        </div>
    );
}

export default InfoCours;