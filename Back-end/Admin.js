class Admin extends User {
    constructor(firstname, surname, email, password, connectionMethod, adminId) {
        super(firstname, surname, email, password, connectionMethod, adminId);
    }

    createCard(place, price) {
        // Vérifier si une carte avec ce nombre de place n'existe pas déjà
        // Requête BDD
    }

    deleteCard(place) {
        // requête BDD
    }

    createCourse(courseId,image,title,type,duration,startDate,startTime,location,maxParticipants,paymentType,price,paymentOptions,isEvening,recurrence = 0,teachers = [],
        links = [],students = [],tags = []){
        // Vérif s'il y a des cours à la même heure que c'est une location différente et un prof diff
        let course = Course(courseId,image,title,type,duration,startDate,startTime,location,maxParticipants,paymentType,price,paymentOptions,isEvening,recurrence,teachers,
                            links,students,tags);
        // requête bdd
    }

    createTeacher(firstname, surname, email, password, connectionMethod, teacherId, photo, description) {
        let teacher = Teacher(firstname, surname, email, password, connectionMethod, teacherId, photo, description);

        // requête BDD
    }

    getPayments(){
        let payments = null // requête BDD
        return payments;
    }

    // Ajouter la suite au fur et à mesure


}