class Teacher extends User {
    constructor(firstname, surname, email, password, connectionMethod, userId, photo, description) {
        super(firstname, surname, email, password, connectionMethod, userId);

        this.photo = photo; // name of file + Format / Ex : image.png
        this.description = description;
    }

    get listStudent() {
        let students = null; // requête BDD --------------------
        if (students == null) throw new Error("Database Error");
        return students;
    }

    saveUser(user) {
        userId = user.userId
        // requête BDD pour sauvegarder l'utilisateur
    };

    getStudent(studentId) {
        let student = null; // requête BDD --------------------
        if (student == null) throw new Error("Database Error");
        return student;
    }

    newStudent(firstname, surname, email, password, connectionMethod, credit) {
        Student(firstname, surname, email, password, connectionMethod, credit);
    }
 
    modifyStudent(newFirstname, newSurname, newEmail, newPassword, newConnectionMethod, newCredit, studentId) {
        let student = this.getStudent(studentId);

        student.firstname = newFirstname;
        student.surname = newSurname;
        student.email = newEmail;
        student.password = newPassword;
        student.connectionMethod = newConnectionMethod;
        student.credit = newCredit;

        this.saveUser(student);
    }

    deleteStudent(studentId) {
        // Requête BDD
    }

    searchCourse(name, tags, period, teacher, length, type) {
        let course = null; // requête BDD --------------------  
        return course; 
    }

    getCourse(courseId) {
        let course = null; // requête BDD --------------------
        if (course == null) throw new Error("Database Error");
        return course;
    }

    saveCourse(course) {
        courseId = course.courseId;
        // requête BDD pour sauvegarder le cours
    };

    affectStudent(studentID, courseID) {
        let course = getCourse(courseID);
        course.students.push(studentID);
        saveCourse(course);
    }

    searchStudent(firstname, surname, email) {
        let student = null; // requête BDD --------------------  
        return student; 
    }

    deleteCourse(courseId) {
        // Requête BDD
    }

    cancelCourse(courseId) {
        let course = this.getCourse(courseId);
        
        if (course.isPassed) throw new Error("Courses passed");

        this.deleteCourse(courseId);
    }

    addPlaceStudent(studentId, type, number) {
        let student = this.getStudent(studentId);
        student.addPlace(type, number);
    }

    getPlaces(period) {
        let place = null ;// requête BDD sur la période pour le professeur
        return place;
    }

    modifyCourse(courseId) {
        let course = this.getCourse(courseId);

        // Ajouter paramètre et modification du cours

        this.saveCourse(course)

    }
}