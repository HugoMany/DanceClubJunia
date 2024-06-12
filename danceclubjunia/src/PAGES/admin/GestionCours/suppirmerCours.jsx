import { URL_DB } from "../../../const/const";
function SupprimerCours({ idCours }) {

    const fetchCours = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteCourse?id=' + { idCours }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du cours', error);
        }
    };
    fetchCours();
}

export default SupprimerCours;

