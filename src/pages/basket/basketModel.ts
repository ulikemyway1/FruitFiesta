import { Cart } from "@commercetools/platform-sdk";
import { fetchCarts, fetchMakeCart } from "./apiBasket";

export default class BasketModel {
  private cart: Cart | null = null;

  async getCarts() {
    const response = await fetchCarts();
    [this.cart] = response.body.results;
    return response.body.results;
  }

  async getCart() {
    if (!this.cart) {
      const carts = await this.getCarts();
      if (carts.length === 0) {
        const cart = await fetchMakeCart();
        this.cart = cart.body;
        // await this.getCarts();
      }
    }
    return this.cart;
  }
}
