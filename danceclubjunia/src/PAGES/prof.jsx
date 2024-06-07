import PlanningProf from './PAGES/planningProf';
import Header from '../elements/header';
import Appel from './appel';
import GetStudentID from './getStudentID';
import AddCreditForm from './addCreditForm';
import React, { useState } from 'react';
const Prof = ()=>{
    const [userID, setUserID] = useState(null);
    return(
    <div>
        
        <Header title="Profil"></Header>
        <div>
            <GetStudentID setUserID={setUserID} />
            {userID && <AddCreditForm userID={userID} />}
        </div>


        <div>
            <PlanningProf></PlanningProf>
        </div>
        <div>
            <Appel></Appel>
        </div>
    </div>


)
}

export default Prof;