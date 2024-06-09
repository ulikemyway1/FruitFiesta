import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import { fetchCarts } from "../../shared/api/apiCart";
import ProductLine from "./productLine/productLine";

export default class BasketView {
  private cart: Cart | undefined;

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["basket__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["basket"],
    children: [this.content],
  });

  constructor() {
    this.getCarts()
      .then((carts) => {
        carts.forEach((cart) => {
          console.log(cart);

          this.cart = cart;
          cart.lineItems.forEach((product) => {
            const productLine = new ProductLine(product, this.cart!);
            this.content.getHTMLElement().append(productLine.getHTMLElement());
          });
        });
      })
      .catch((error) => {
        console.log("Error while fetching products: ", error);
        window.history.back();
      });
  }

  async getCarts() {
    const response = await fetchCarts();
    return response.body.results;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
