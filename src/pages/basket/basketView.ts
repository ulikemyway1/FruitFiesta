import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";
import DiscountCodeLine from "./discountCodeLine/discountCodeLine";
import { fetchAddDiscountCode, fetchDeleteCart } from "./apiBasket";
import basketModel from "./basketModel";
import cleanContainer from "../../shared/utils/clean-container";

export default class BasketView {
  cart: Cart | undefined;

  private lineItems = new CreateElement({
    tag: "div",
    cssClasses: ["basket__line-items"],
  }).getHTMLElement();

  private discountCodeItems = new CreateElement({
    tag: "div",
    cssClasses: ["basket__discount-code-items"],
  }).getHTMLElement();

  private cartTotalPrice = new CreateElement({
    tag: "div",
    cssClasses: ["basket__total-price"],
  }).getHTMLElement();

  private discountCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["basket__discount-code-input"],
    attributes: {
      type: "text",
      placeholder: "Discount code",
    },
  }).getHTMLElement();

  private addDiscountButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["basket__add-discount-button"],
    textContent: "Add",
    eventType: "click",
    callback: () => {
      console.log("Add discount button clicked");
      this.addDiscount(this.discountCodeInput.value);
      this.discountCodeInput.value = "";
    },
  }).getHTMLElement();

  private discountLabel = new CreateElement({
    tag: "div",
    cssClasses: ["basket__discount-label"],
    textContent: "Add discount code",
    children: [this.discountCodeInput, this.addDiscountButton],
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
    children: [
      this.lineItems,
      this.discountCodeItems,
      this.cartTotalPrice,
      this.discountLabel,
      this.deleteCartButton,
    ],
  });

  render(cart: Cart) {
    if (!cart || !cart.lineItems.length) {
      this.showEmptyCart();
      return;
    }

    this.cart = cart;

    this.renderLineItems(cart);

    this.renderDiscountCodeItems(cart);

    this.setCartTotalPrice(cart);
  }

  renderLineItems(cart: Cart) {
    cleanContainer(this.lineItems);

    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(
        product,
        this.setCartTotalPrice.bind(this),
        this.deleteCart.bind(this),
      );
      this.lineItems.append(productLine.getHTMLElement());
    });
  }

  renderDiscountCodeItems(cart: Cart) {
    cleanContainer(this.discountCodeItems);

    cart.discountCodes.forEach((discountCode) => {
      const discountCodeLine = new DiscountCodeLine(
        discountCode.discountCode,
        this.setCartTotalPrice.bind(this),
      );
      this.discountCodeItems.append(discountCodeLine.getHTMLElement());
    });
  }

  addDiscount(discountCode: string) {
    fetchAddDiscountCode(basketModel.cart, discountCode)
      .then((response) => {
        const cart = response.body;
        basketModel.cart = cart;
        this.renderDiscountCodeItems(cart);
        this.setCartTotalPrice(cart);
      })
      .catch((error) => {
        console.log("Error while adding discount code: ", error);
      });
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
