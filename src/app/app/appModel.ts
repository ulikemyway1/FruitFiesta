interface Observer {
  update(subject: AppModel): void;
}

export default class AppModel {
  // userIsLoggedIn: boolean = false;

  private _userIsLoggedIn: boolean = false;

  authToken = localStorage.getItem("auth-token");

  private observers: Observer[] = [];

  constructor() {
    if (this.authToken) {
      // eslint-disable-next-line no-underscore-dangle
      this._userIsLoggedIn = true;
    }
  }

  get userIsLoggedIn() {
    // eslint-disable-next-line no-underscore-dangle
    return this._userIsLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    // eslint-disable-next-line no-underscore-dangle
    this._userIsLoggedIn = value;
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
