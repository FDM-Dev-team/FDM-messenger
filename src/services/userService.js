import React from "react"; // Add the missing import statement

class UserService {
  constructor() {
    this.loggedIn = false;
  }

  login(username, password) {
    // Perform login logic here
    // For simplicity, let's assume the login is successful
    this.loggedIn = true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

export default UserService;
