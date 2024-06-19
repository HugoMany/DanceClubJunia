import PlanningProf from './planningProf';
import Header from '../../elements/header';
import Appel from './appel';
import GetStudentID from '../getStudentID';
import AjoutCredits from '../ajoutCredits';
import React, { useState } from 'react';
import AddTagToACours from './addTagToACours';
import AddlinkToACours from './addLinkToACours';
import { Button } from '@mui/material';
// import TeacherRequire from '../elements/teacherRequire.jsx';
const Prof = ()=>{
    const [userID, setUserID] = useState(null);
    // TeacherRequire()
    return(
    <div className='ProfPage'>
        
        <Header title="Profil"></Header>
        <div>
            <GetStudentID setUserID={setUserID}/>
           
        </div>


        {/* <div>
            <PlanningProf teacherId="1"></PlanningProf>
        </div> */}
                      <hr  id='traitProf'/>

        <div>
            <Appel></Appel>
        </div>
              <hr  id='traitProf'/>

        <Button Button variant="contained" color="primary" href='/prof/allContact'> Tout les contacts des students</Button>

    </div>



)
}

export default Prof;