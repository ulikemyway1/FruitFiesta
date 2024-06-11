import "./productLine.scss";
import { Cart, LineItem } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchChangeQuantity, fetchRemoveFromCart } from "../apiBasket";

import basketModel from "../basketModel";

export default class ProductLine {
  private product: LineItem;

  setCartTotalPrice: (cart: Cart) => void;

  private name = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__name"],
  });

  private price = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__price"],
  });

  private discountPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__discount-price"],
  });

  // private currency = new CreateElement({
  //   tag: "div",
  //   cssClasses: ["product-line__currency"],
  // });

  private quantity = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__quantity"],
  });

  private minus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__minus"],
    textContent: "-",
    eventType: "click",
    callback: this.changeQuantityHandler.bind(this, -1),
  });

  private plus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__plus"],
    textContent: "+",
    eventType: "click",
    callback: this.changeQuantityHandler.bind(this, 1),
  });

  private delete = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__delete"],
    textContent: "✖",
    eventType: "click",
    callback: this.removeProductHandler.bind(this),
  });

  private totalLineItemPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__total-line-item-price"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-line"],
    children: [
      this.delete,
      this.name,
      this.price,
      this.discountPrice,
      // this.currency,
      this.minus,
      this.quantity,
      this.plus,
      this.totalLineItemPrice,
    ],
  });

  constructor(product: LineItem, setCartTotalPrice: (cart: Cart) => void) {
    this.product = product;
    this.setCartTotalPrice = setCartTotalPrice;

    this.name.getHTMLElement().textContent = product.name["en-GB"];
    this.price.getHTMLElement().textContent = `${product.price.value.centAmount / 100} ${product.price.value.currencyCode}`;
    if (product.price.discounted) {
      this.discountPrice.getHTMLElement().textContent = `${product.price.discounted.value.centAmount / 100} ${product.price.discounted.value.currencyCode}`;
      this.price.getHTMLElement().style.textDecoration = "line-through";
    }
    // this.currency.getHTMLElement().textContent =
    //   product.price.value.currencyCode;
    this.quantity.getHTMLElement().textContent = `${product.quantity}`;
    this.totalLineItemPrice.getHTMLElement().textContent = `${
      product.totalPrice.centAmount / 100
    } ${product.totalPrice.currencyCode}`;
  }

  private async changeQuantityHandler(change: number) {
    if (!this.product?.quantity) return;
    const newQuantity = this.product.quantity + change;
    const cart = await basketModel.getCart();
    fetchChangeQuantity(cart, this.product.id, newQuantity)
      .then((response) => {
        basketModel.cart = response.body;
        this.product = response.body.lineItems.find(
          (lineItem) => lineItem.id === this.product.id,
        )!;
        if (newQuantity === 0) {
          this.container.getHTMLElement().remove();
          return;
        }
        this.quantity.getHTMLElement().textContent = `${this.product.quantity}`;
        this.totalLineItemPrice.getHTMLElement().textContent = `${
          this.product.totalPrice.centAmount / 100
        } ${this.product.totalPrice.currencyCode}`;

        this.setCartTotalPrice(response.body);
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      });
  }

  private async removeProductHandler() {
    // console.log(basketModel.cart);
    const cart = await basketModel.getCart();
    fetchRemoveFromCart(cart, this.product.id).then((response) => {
      basketModel.cart = response.body;
      this.setCartTotalPrice(response.body);
      this.container.getHTMLElement().remove();
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
