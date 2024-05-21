class User {
    constructor(firstname, surname, email, password, connectionMethod, userid) {

        if(firstname == null || surname == null || email == null || password == null || connectionMethod == null) {
            throw new Error("Empty field");
        }

        // User informations
        this.firstname = firstname;
        this.sirname = sirname;
        this.email = email;
        this.password = password;
        this.connectionMethod = connectionMethod;
    }
    
    //Setters
    setFirstname(firstname){
        if(firstname == null) throw new Error("Empty field");
        this.firstname = firstname;
    }
    
    setSurname(surname){
        if(surname == null) throw new Error("Empty field");
        this.surname = surname;
    }
    
    setEmail(email){
        if(email == null) throw new Error("Empty field");
        this.email = email;
    }
    
    setPassword(password){
        if(password == null) throw new Error("Empty field");
        this.password = password;
    }
    
    //Getters
    get firstname(){
        return this.firstname;
    }
    
    get surname(){
        return this.surname;
    }
    
    get email(){
        return this.email;
    }
    
    get password(){
        return this.password;
    }
 
    /**
     * Function to change Password
     * 
     * @param {String} newPassword New password
     * @returns null
     * 
     */
    changePassword(newPassword) {
        if(newPassword == null) throw new Error("Empty field");

        this.password = newPassword;
    }
}