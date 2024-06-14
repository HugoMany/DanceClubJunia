import { URL_DB } from "../../../const/const";
import Header from "../../../elements/header";
import Loading from "../../../elements/loading";
import { useState } from "react";
import { useParams } from 'react-router-dom';
 
function SupprimerEleve() {
    const [loading, setLoading] = useState(true);
    const { idParam } = useParams();

    console.log(idParam+'idEleve');

    const fetchEleve = async () => {
        try {
            const token = localStorage.getItem('token');
            // if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteStudent', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: idParam
                })
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du student', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/admin/eleve';
            }, 2000);
        }
    };
    fetchEleve();
    
        if (loading) {
            return <Loading />;
        }
        else{
    return(
        <div>
            <Header title={"Supprimer un eleve"}></Header>
            <h1>Le student N°{idParam} a été supprimé</h1>
            <h2> Redirection dans 2 secondes</h2>
        </div>
    )
}
}

export default SupprimerEleve;