import { URL_DB } from "../../../const/const";
function SupprimerCours({ idCours }) {

    const fetchCours = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteCourse', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body:
                {
                    courseID: idCours
                }
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du cours', error);
        }
    };
    fetchCours();
}

export default SupprimerCours;

