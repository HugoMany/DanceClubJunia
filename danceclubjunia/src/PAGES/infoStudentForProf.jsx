import GetStudentID from "./getStudentID";
import InfoStudent from "./infoStudent";
import InfoStudentCourse from "./infoStudentCourse";
import Header from "../elements/header";
import React, { useState } from 'react';


const InfoStudentForProf = ()=>{ 
    const [userID, setUserID] = useState(null);
    return(
        <div>
            <Header title="Profil"></Header>
            <div>
                <GetStudentID setUserID={setUserID} />
                {userID && <InfoStudent userID={userID} />}
                {userID && <InfoStudentCourse userID={userID}/>}
            </div>
        </div>

    )
}

export default InfoStudentForProf