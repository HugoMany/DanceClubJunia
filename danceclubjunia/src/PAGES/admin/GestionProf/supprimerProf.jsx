import { URL_DB } from "../../../const/const";

const profId = 'votre_id_de_prof';

fetch(URL_DB+`admin/deleteProf?id=${profId}`, {
    method: 'DELETE',
})
    .then(response => {
        if (response.ok) {
            console.log('Le prof a été supprimé avec succès.');
        } else {
            console.error('Une erreur s\'est produite lors de la suppression du prof.');
        }
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression du prof :', error);
    });