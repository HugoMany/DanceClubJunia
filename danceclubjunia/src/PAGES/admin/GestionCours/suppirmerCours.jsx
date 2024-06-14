import { URL_DB } from "../../../const/const";
import Header from "../../../elements/header";
import Loading from "../../../elements/loading";
import { useState } from "react";
import { useParams } from 'react-router-dom';
 
function SupprimerCours() {
    const [loading, setLoading] = useState(true);
    const { idParam } = useParams();

    console.log(idParam+'idCours');

    const fetchCours = async () => {
        try {
            const token = localStorage.getItem('token');

            console.log(token)
            await fetch(URL_DB + 'admin/deleteCourse', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    courseID: idParam
                })
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du cours', error);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.location.href = '/admin/cours';
            }, 2000);
        }
    };
    fetchCours();
    
        if (loading) {
            return <Loading />;
        }
        else{
    return(
        <div>
            <Header title={"Supprimer un cours"}></Header>
            <h1>Le cours N°{idParam} a été supprimé</h1>
            <h2> Redirection dans 2 secondes</h2>
        </div>
    )
}
}

export default SupprimerCours;