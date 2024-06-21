import React from 'react';
import { useParams } from 'react-router-dom';
import AddTagToACours from './addTagToACours';
import AddlinkToACours from './addLinkToACours';
import ReturnStudentsProfil from './returnStudentsProfil';
import Header from '../../elements/header';
import { Button } from '@mui/material';
import DeleteACours from './deleteACours';
const CoursDynamiqueProf = () => { 
    const { idCours } = useParams();
    return (
        <div className='coursDynamiqueProf'>
            <Button variant="contained" href='/prof/'><span class="material-symbols-outlined">
undo
</span>Return</Button>
            <Header></Header>
            <AddTagToACours idCoursSelected={idCours} />
            <AddlinkToACours idCoursSelected={idCours} />
            <ReturnStudentsProfil idCoursSelected={idCours} />
            <DeleteACours idCoursSelected={idCours}></DeleteACours>
        </div>
    );
};

export default CoursDynamiqueProf;