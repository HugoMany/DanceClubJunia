import { URL_DB } from "../../../const/const";
function SupprimerProf({ idProf }) {

    const fetchProf = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return { valid: false };
            console.log(token)
            await fetch(URL_DB + 'admin/deleteTeacher', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body:
                {
                    teacherID: idProf
                }
            });
        } catch (error) {
            console.error('Erreur lors de la supprétion du prof', error);
        }
    };
    fetchProf();
}

export default SupprimerProf;

