import { Customer } from "@commercetools/platform-sdk";
import requestAPI from "../../shared/api/APIRootBuilder";

interface Observer {
  update(subject: User): void;
}

class User {
  private privateUserIsLoggedIn: boolean = false;

  private observers: Observer[] = [];

  private authToken = localStorage.getItem("auth-token");

  private userData: Customer | null = null;

  private version: number = 0;

  constructor() {
    if (this.authToken) {
      this.userIsLoggedIn = true;
      requestAPI
        .apiRoot()
        .me()
        .get()
        .execute()
        .then((response) => {
          this.userData = response.body;
          this.version = response.body.version;
          this.notify();
        });
    }
  }

  get userIsLoggedIn() {
    return this.privateUserIsLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    this.privateUserIsLoggedIn = value;
    this.notify();
  }

  set userInfo(userData: Customer | null) {
    this.userData = userData;
  }

  get userInfo(): Customer | null {
    return this.userData;
  }

  set userVersion(version: number) {
    this.version = version;
  }

  get userVersion() {
    return this.version;
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
