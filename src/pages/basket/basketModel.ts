import { Cart } from "@commercetools/platform-sdk";
import { fetchCarts, fetchMakeCart } from "./apiBasket";

interface Observer {
  updateFromCart(count: number): void;
}

class BasketModel {
  privateCart: Cart | null = null;

  private observers: Observer[] = [];

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
      observer.updateFromCart(this.privateCart?.totalLineItemQuantity || 0);
    });
  }

  constructor() {
    this.getCart();
  }

  async getCarts() {
    const response = await fetchCarts();
    [this.privateCart] = response.body.results;
    return response.body.results;
  }

  async getCart() {
    if (!this.privateCart) {
      const carts = await this.getCarts();
      if (carts.length === 0) {
        const cart = await fetchMakeCart();
        this.privateCart = cart.body;
      } else {
        [this.privateCart] = carts;
      }
    }
    this.notify();
    return this.privateCart;
  }

  set cart(cart: Cart) {
    this.privateCart = cart;
    this.notify();
  }

  get cart() {
    return this.privateCart as Cart;
  }

  resetCart() {
    this.privateCart = null;
    this.notify();
  }
}

const basketModel = new BasketModel();
export default basketModel;
