import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";

export default class BasketView {
  private content = new CreateElement({
    tag: "div",
    cssClasses: ["basket__content"],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["basket"],
    children: [this.content],
  });

  private cartTotalPrice = new CreateElement({
    tag: "div",
    cssClasses: ["basket__total-price"],
  }).getHTMLElement();

  render(cart: Cart) {
    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(
        product,
        this.setCartTotalPrice.bind(this),
      );
      this.content.append(productLine.getHTMLElement());
    });

    this.setCartTotalPrice(cart);

    this.content.append(this.cartTotalPrice);
  }

  setCartTotalPrice(cart: Cart) {
    this.cartTotalPrice.textContent = `Total: ${cart.totalPrice.centAmount / 100} ${cart.totalPrice.currencyCode}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
