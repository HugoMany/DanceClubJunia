import { URL_DB } from "../../../const/const";
function SupprimerEleve({ idEleve }) {

    const fetchEleve = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteStudent', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body:
                {
                    studentID: idEleve
                }
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du student', error);
        }
    };
    fetchEleve();
}

export default SupprimerEleve;

