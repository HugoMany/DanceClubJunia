import { URL_DB } from "../../../const/const";
import Header from "../../../elements/header";
import Loading from "../../../elements/loading";
import { useState } from "react";
import { useParams } from 'react-router-dom';
 
function SupprimerProf() {
    const [loading, setLoading] = useState(true);
    const { idParam } = useParams();

    console.log(idParam+'idProf');

    const fetchProf = async () => {
        try {
            const token = localStorage.getItem('token');
            // if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteTeacher', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teacherID: idParam
                })
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du prof', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/admin/prof';
            }, 2000);
        }
    };
    fetchProf();
    
        if (loading) {
            return <Loading />;
        }
        else{
    return(
        <div>
            <Header title={"Supprimer un prof"}></Header>
            <h1>Le prof N°{idParam} a été supprimé</h1>
            <h2> Redirection dans 2 secondes</h2>
        </div>
    )
}
}

export default SupprimerProf;