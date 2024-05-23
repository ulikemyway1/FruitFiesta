interface Observer {
  update(subject: User): void;
}

class User {
  private privateUserIsLoggedIn: boolean = false;

  private observers: Observer[] = [];

  private authToken = localStorage.getItem("auth-token");

  constructor() {
    if (this.authToken) {
      this.userIsLoggedIn = true;
    }
  }

  get userIsLoggedIn() {
    return this.privateUserIsLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    this.privateUserIsLoggedIn = value;
    this.notify();
  }

  public attach(observer: Observer) {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer) {
    const observerIndex = this.observers.indexOf(observer);
    if (!(observerIndex === -1)) {
      this.observers.splice(observerIndex, 1);
    }
  }

  public notify() {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

export default new User();
