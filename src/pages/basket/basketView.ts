import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";
import { fetchCarts, fetchDeleteCart } from "./apiBasket";
import basketModel from "./basketModel";

export default class BasketView {
  cart: Cart | undefined;

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

  private deleteCartButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["basket__delete-cart-button"],
    textContent: "Delete cart",
    eventType: "click",
    callback: this.deleteCart.bind(this),
  }).getHTMLElement();

  render(cart: Cart) {
    this.cart = cart;

    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(
        product,
        this.setCartTotalPrice.bind(this),
      );
      this.content.append(productLine.getHTMLElement());
    });

    this.setCartTotalPrice(cart);

    this.content.append(this.cartTotalPrice, this.deleteCartButton);
  }

  deleteCart() {
    console.log("delete cart");
    if (this.cart)
      fetchDeleteCart(this.cart).then((response) => {
        console.log(response);
        fetchCarts().then((response2) => {
          console.log(response2);
        });
        basketModel.resetCart();
        // this.render(basketModel.cart);
      });
  }

  setCartTotalPrice(cart: Cart) {
    this.cartTotalPrice.textContent = `Total: ${cart.totalPrice.centAmount / 100} ${cart.totalPrice.currencyCode}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
