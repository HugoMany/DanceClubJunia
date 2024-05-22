class Course {
    constructor({
      courseId,
      image,
      title,
      type,
      duration,
      startDate,
      startTime,
      location,
      maxParticipants,
      paymentType,
      price,
      paymentOptions,
      isEvening,
      recurrence = 0, // 0 = no recurrence / else n = number of day before recurrence
      teachers = [],
      links = [],
      students = [],
      tags = []
    }) {
      this.courseId = courseId;
      this.image = image;
      this.title = title;
      this.type = type;
      this.duration = duration;
      this.startDate = new Date(`${startDate}T${startTime}`);
      this.location = location;
      this.maxParticipants = maxParticipants;
      this.paymentType = paymentType;
      this.price = price;
      this.paymentOptions = paymentOptions;
      this.isEvening = isEvening;
      this.recurrence = recurrence;
      this.teachers = teachers;
      this.links = links;
      this.students = students;
      this.tags = tags;
    }
  
    // Setters  
    setImage(image) {
      if (!image) throw new Error("Image is required");
      this.image = image;
    }
  
    setTitle(title) {
      if (!title) throw new Error("Title is required");
      this.title = title;
    }
  
    setType(type) {
      if (!type) throw new Error("Type is required");
      this.type = type;
    }
  
    setDuration(duration) {
      if (!duration) throw new Error("Duration is required");
      this.duration = duration;
    }
  
    setStartDate(startDate, startTime) {
      this.startDate = new Date(`${startDate}T${startTime}`);
    }
  
    setLocation(location) {
      if (!location) throw new Error("Location is required");
      this.location = location;
    }
  
    setMaxParticipants(maxParticipants) {
      if (!Number.isInteger(maxParticipants) || maxParticipants <= 0) throw new Error("Invalid number of participants");
      this.maxParticipants = maxParticipants;
    }
  
    setPaymentType(paymentType) {
      if (!paymentType) throw new Error("Payment type is required");
      this.paymentType = paymentType;
    }
  
    setPrice(price) {
      if (this.paymentType === 'achat à l’unité' && (price == null || price < 0)) throw new Error("Invalid price");
      this.price = price;
    }
  
    setPaymentOptions(paymentOptions) {
      this.paymentOptions = paymentOptions;
    }
  
    setIsEvening(isEvening) {
      this.isEvening = isEvening;
    }
  
    setRecurrence(recurrence) {
      this.recurrence = recurrence;
    }
  
    setTeachers(teachers) {
      this.teachers = teachers;
    }
  
    setLinks(links) {
      this.links = links;
    }
  
    setStudents(students) {
      this.students = students;
    }
  
    setTags(tags) {
      this.tags = tags;
    }
  
    // Getters
    getCourseId() {
      return this.courseId;
    }
  
    getImage() {
      return this.image;
    }
  
    getTitle() {
      return this.title;
    }
  
    getType() {
      return this.type;
    }
  
    getDuration() {
      return this.duration;
    }
  
    getStartDate() {
      return this.startDate;
    }
  
    getLocation() {
      return this.location;
    }
  
    getMaxParticipants() {
      return this.maxParticipants;
    }
  
    getPaymentType() {
      return this.paymentType;
    }
  
    getPrice() {
      return this.price;
    }
  
    getPaymentOptions() {
      return this.paymentOptions;
    }
  
    getIsEvening() {
      return this.isEvening;
    }
  
    getRecurrence() {
      return this.recurrence;
    }
  
    getTeachers() {
      return this.teachers;
    }
  
    getLinks() {
      return this.links;
    }
  
    getStudents() {
      return this.students;
    }
  
    getTags() {
      return this.tags;
    }
  
    // Add a student
    addStudent(student) {
      if (this.students.length >= this.maxParticipants) {
        throw new Error("Maximum number of participants reached");
      }
      this.students.push(student);
    }
  
    // Remove a student
    removeStudent(student) {
      this.students = this.students.filter(s => s !== student);
    }
  
    // Add a link
    addLink(link) {
      this.links.push(link);
    }
  
    // Remove a link
    removeLink(link) {
      this.links = this.links.filter(l => l !== link);
    }
  
    // Add a tag
    addTag(tag) {
      this.tags.push(tag);
    }
  
    // Remove a tag
    removeTag(tag) {
      this.tags = this.tags.filter(t => t !== tag);
    }
  
    // Add a teacher
    addTeacher(teacher) {
      if (this.isEvening) {
        throw new Error("Cannot add teachers to an evening course");
      }
      this.teachers.push(teacher);
    }
  
    // Remove a teacher
    removeTeacher(teacher) {
      this.teachers = this.teachers.filter(t => t !== teacher);
    }
  }