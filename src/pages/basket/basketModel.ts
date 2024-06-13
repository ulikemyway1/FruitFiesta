import { Cart } from "@commercetools/platform-sdk";
import { fetchCarts, fetchMakeCart } from "./apiBasket";

class BasketModel {
  privateCart: Cart | null = null;

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
    return this.privateCart;
  }

  set cart(cart: Cart) {
    this.privateCart = cart;
  }

  get cart() {
    return this.privateCart as Cart;
  }

  resetCart() {
    this.privateCart = null;
  }
}

const basketModel = new BasketModel();
export default basketModel;
