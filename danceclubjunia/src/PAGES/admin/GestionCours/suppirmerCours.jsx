import { URL_DB } from "../../../const/const";

const courseId = 'votre_id_de_cours';

fetch(URL_DB+`admin/deleteCourse?id=${courseId}`, {
    method: 'DELETE',
})

    .then(response => {
        if (response.ok) {
            console.log('Le cours a été supprimé avec succès.');
        } else {
            console.error('Une erreur s\'est produite lors de la suppression du cours.');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression du cours :', error);
    });