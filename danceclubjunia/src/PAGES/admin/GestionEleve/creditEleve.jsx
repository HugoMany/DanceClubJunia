import Header from '../elements/header';
import GetStudentID from './getStudentID';
import AjoutCredits from './ajoutCredits';
import React, { useState } from 'react';
const CreditEleve = ()=>{
    const [userID, setUserID] = useState(null);
    return(
    <div>
        
        <Header title="Profil"></Header>
        <div>
            <GetStudentID setUserID={setUserID} />
            {userID && <AjoutCredits userID={userID} />}
        </div>


        
        
    </div>


)
}

export default CreditEleve;