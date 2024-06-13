import PlanningProf from '../PAGES/planningProf';
import Header from '../elements/header';
import Appel from './appel';
import GetStudentID from './getStudentID';
import AjoutCredits from './ajoutCredits';
import React, { useState } from 'react';
import TeacherRequire from '../elements/teacherRequire.jsx';
const Prof = ()=>{
    const [userID, setUserID] = useState(null);
    TeacherRequire()
    return(
    <div>
        
        <Header title="Profil"></Header>
        <div>
            <GetStudentID setUserID={setUserID} />
            {userID && <AjoutCredits userID={userID} />}
        </div>


        <div>
            <PlanningProf teacherId="Teacher 1"></PlanningProf>
        </div>
        <div>
            <Appel></Appel>
        </div>
    </div>


)
}

export default Prof;