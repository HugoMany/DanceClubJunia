class Student extends User {
    constructor(firstname, surname, email, password, connectionMethod, credit) {
        super(firstname, surname, email, password, connectionMethod);
        
        this.credit = credit;
        //this.subscriptionEndDate = ; Récupérer la date de fin dans la base de données
      }
    
      //Setters
      setCredit(credit){
          if(credit == null) throw new Error("Empty field");
          this.credit = credit;
      }

      setSubscriptionEndDate(credit){
          if(subscriptionEndDate == null) throw new Error("Empty field");
          this.subscriptionEndDate = subscriptionEndDate;
          // Mettre à jour la bdd avec la nouvelle date
      }
      
      //Getters
      get credit(){
          return this.credit;
      }
      
      get subscriptionEndDate(){
          return this.subscriptionEndDate;
      }

      //Get the number of days remaining before the end of the subscription
      getRemainingSubscriptionDays() {
        const currentDate = new Date();
        const endDate = this.subscriptionEndDate;
        
        //Difference in milliseconds
        const timeDiff = endDate - currentDate;
        
        //Convert to days
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        return daysRemaining > 0 ? daysRemaining : 0; // If the date has passed, return 0
      }

      //Add subscription
      addSubscription() {
        if (days == null || days <= 0) throw new Error("Invalid number of days");
    
        const currentDate = new Date();
        
        // If the subscription has not ended, add days to the current end date
        if (this.subscriptionEndDate && this.subscriptionEndDate > currentDate) {
          this.subscriptionEndDate.setDate(this.subscriptionEndDate.getDate() + days);
        } else {
          // Else, define a new end date by adding days to the current date
          this.subscriptionEndDate = new Date();
          this.subscriptionEndDate.setDate(currentDate.getDate() + days);
        }
    
        // Mettre à jour la bdd avec la nouvelle date
      }
}