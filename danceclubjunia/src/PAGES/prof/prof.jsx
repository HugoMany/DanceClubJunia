import PlanningProf from './planningProf';
import Header from '../../elements/header';
import Appel from './appel';
import GetStudentID from '../getStudentID';
import AjoutCredits from '../ajoutCredits';
import React, { useState } from 'react';
import AddTagToACours from './addTagToACours';
// import TeacherRequire from '../elements/teacherRequire.jsx';
const Prof = ()=>{
    const [userID, setUserID] = useState(null);
    // TeacherRequire()
    return(
    <div className='ProfPage'>
        
        <Header title="Profil"></Header>
        <div>
            <GetStudentID setUserID={setUserID} />
           
        </div>


        <div>
            <PlanningProf teacherId="1"></PlanningProf>
        </div>
        <div>
            <Appel></Appel>
        </div>
        <div>
            <AddTagToACours></AddTagToACours>
        </div>
    </div>


)
}

export default Prof;