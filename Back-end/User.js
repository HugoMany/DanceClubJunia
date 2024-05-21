class User {
    constructor(firstname, surname, email, password, connectionMethod, userId) {

        if(firstname == null || surname == null || email == null || password == null || connectionMethod == null || userId == null) {
            throw new Error("Empty field");
        }

        // User informations
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.connectionMethod = connectionMethod;
        this.userId = userId;
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
    
    setConnectionMethod(connectionMethod){
        if(connectionMethod == null) throw new Error("Empty field");
        this.connectionMethod = connectionMethod;
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
    
    get connectionMethod(){
        return this.connectionMethod;
    }
    
    get userId(){
        return this.userId;
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

    /**
     * Function to connect to the account
     *
     * @param {String} email Email to connect with
     * @param {String} password Password to connect with
     * @returns {Boolean} True if the connection is successful, False otherwise
     */
    connect(email, password) {
      if (email == null || password == null) throw new Error("Empty field");
  
      // Check if the provided email and password match the stored email and password
      if (this.email === email && this.password === password) {
        console.log("Connection successful");
        return true;
      } else {
        console.log("Invalid email or password");
        return false;
      }
    }


}