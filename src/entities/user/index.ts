import { Customer } from "@commercetools/platform-sdk";
import requestAPI from "../../shared/api/APIRootBuilder";
import basketModel from "../../pages/basket/basketModel";

interface Observer {
  update(subject: User): void;
}

class User {
  private privateUserIsLoggedIn: boolean = false;

  private observers: Observer[] = [];

  private userData: Customer | null = null;

  constructor() {
    if (JSON.parse(localStorage.getItem("LoggedIn") || "false")) {
      this.userIsLoggedIn = true;
      requestAPI
        .apiRoot()
        .me()
        .get()
        .execute()
        .then((response) => {
          this.userData = response.body;
          this.notify();
        });
    }
  }

  get userIsLoggedIn() {
    return this.privateUserIsLoggedIn;
  }

  set userIsLoggedIn(value: boolean) {
    this.privateUserIsLoggedIn = value;
    basketModel.resetCart();
    basketModel.getCart();
    this.notify();
  }

  set userInfo(userData: Customer | null) {
    this.userData = userData;
  }

  get userInfo(): Customer | null {
    return this.userData;
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
