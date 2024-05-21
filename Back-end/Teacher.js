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

    getStudent(userstudentIdId) {
        let student = null; // requête BDD --------------------
        if (student == null) throw new Error("Database Error");
        return student;
    }

    newStudent(firstname, surname, email, password, connectionMethod, credit) {
        Student(firstname, surname, email, password, connectionMethod, credit);
    }
 
    modifyStudent(studentId) {
        let student = this.getStudent(studentId);
        
        
    }
}