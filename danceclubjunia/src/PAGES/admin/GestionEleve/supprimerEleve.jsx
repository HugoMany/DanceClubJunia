import { URL_DB } from "../../../const/const";

const studentId = 'votre_id_de_student';

fetch(URL_DB+`admin/deleteStudent?id=${studentId}`, {
    method: 'DELETE',
})
    .then(response => {
        if (response.ok) {
            console.log('Le student a été supprimé avec succès.');
        } else {
            console.error('Une erreur s\'est produite lors de la suppression du student.');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression du student :', error);
    });