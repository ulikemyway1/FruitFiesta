class User {
  userIsLoggedIn: boolean = false;

  authToken = localStorage.getItem("auth-token");

  constructor() {
    if (this.authToken) {
      this.userIsLoggedIn = true;
    }
  }
}

export default new User();
