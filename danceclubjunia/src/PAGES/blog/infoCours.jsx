import React from 'react';
import Header from '../../elements/header';
import "../../css/blog.css"
function InfoCours({ title, content, image }) {
    return (
        <div className='blogGlobal'>
            <Header></Header>
            <div className='blogCoursDance'>
            <img src={image} alt="" />
            <h1>{title}</h1>
            {content}
            </div>
        </div>
    );
}

export default InfoCours;