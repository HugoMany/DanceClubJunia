class Student extends User {
    constructor(firstname, surname, email, password, connectionMethod,userId, credit) {
        super(firstname, surname, email, password, connectionMethod, userId);
        
        this.credit = credit;

        //this.subscriptionEndDate = ; Récupérer la date de fin dans la base de données
        //this.tickets = ; Récupérer le nombre de tickets dans la bdd
        //this.card = ; Récupérer les cartes dans la bdd
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
      addSubscription(months) {
        if (months == null || months <= 0) throw new Error("Invalid number of months");
    
        const currentDate = new Date();
        
        // If the subscription has not ended, add months to the current end date
        if (this.subscriptionEndDate && this.subscriptionEndDate > currentDate) {
          this.subscriptionEndDate.setDate(this.subscriptionEndDate.getDate() + months*30);
        } else {
          // Else, define a new end date by adding months to the current date
          this.subscriptionEndDate = new Date();
          this.subscriptionEndDate.setDate(currentDate.getDate() + months*30);
        }
    
        // Mettre à jour la bdd avec la nouvelle date
      }

      //Get courses
      getCourses() {
        courses = null; // Requete bdd
        return courses
      }

      //Add link
      addLink(courseId, link) {
        //Recup link de courseid dans bdd
        //Ajout du nouveau link
        //Modification bdd
      }

      //Add tickets, a card or subscription
      addPlace(type, number){
        if (number == null || number <= 0) throw new Error("Invalid number");
        switch (type) {
          case 'ticket':
            this.tickets += number;
            break;
          case 'card':
            this.cards += (0,number);
            break;
          case 'subscription':
            this.addSubscription(number);
        }
      }

      //Payments history
      paymentsHistory() {
        //Recup bdd
      }

      //Buy
      buy(type, number){
        if (number == null || number <= 0) throw new Error("Invalid number");
        price = 0;//On récupère le prix à l'unité dans la bdd
        price *= number;
        if (price <= this.credit) {
          this.credit -= price;
          this.addPlace(type,number);
        }
        else{
          throw new Error("Not enough credit");
        }
      }

}