import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";
import { fetchDeleteCart } from "./apiBasket";
import basketModel from "./basketModel";
import cleanContainer from "../../shared/utils/clean-container";

export default class BasketView {
  cart: Cart | undefined;

  private lineItems = new CreateElement({
    tag: "div",
    cssClasses: ["basket__line-items"],
  }).getHTMLElement();

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

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["basket"],
    children: [this.lineItems, this.cartTotalPrice, this.deleteCartButton],
  });

  render(cart: Cart) {
    if (!cart || !cart.lineItems.length) {
      this.showEmptyCart();
      return;
    }

    this.cart = cart;

    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(
        product,
        this.setCartTotalPrice.bind(this),
        this.deleteCart.bind(this),
      );
      this.lineItems.append(productLine.getHTMLElement());
    });

    this.setCartTotalPrice(cart);
  }

  deleteCart() {
    if (basketModel.cart)
      fetchDeleteCart(basketModel.cart)
        .then((response) => {
          console.log(response);
          basketModel.resetCart();
          cleanContainer(this.container.getHTMLElement());
          this.render(basketModel.cart);
        })
        .catch((error) => {
          console.log("Error while deleting cart: ", error);
        });
  }

  showEmptyCart() {
    cleanContainer(this.container.getHTMLElement());
    this.container.addInnerElements([
      new CreateElement({
        tag: "div",
        cssClasses: ["basket__empty"],
        textContent: "Your cart is empty",
      }).getHTMLElement(),
      new CreateElement({
        tag: "a",
        cssClasses: ["basket__empty-link"],
        textContent: "Go to catalog",
        attributes: {
          href: "#catalog",
        },
      }).getHTMLElement(),
    ]);
  }

  setCartTotalPrice(cart: Cart) {
    this.cartTotalPrice.textContent = `Total cost: ${cart.totalPrice.centAmount / 100} ${cart.totalPrice.currencyCode}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
