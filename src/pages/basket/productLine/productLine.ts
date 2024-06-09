import "./productLine.scss";
import { Cart, LineItem } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import {
  //   fetchAddToCart,
  fetchChangeQuantity,
} from "../apiBasket";

import { CustomCart } from "../interface";

export default class ProductLine {
  private cart: CustomCart;

  private product: LineItem;

  private name = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__name"],
  });

  private price = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__price"],
  });

  private currency = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__currency"],
  });

  private minus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__minus"],
    textContent: "-",
    eventType: "click",
    callback: this.changeQuantity.bind(this, -1),
  });

  private quantity = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__quantity"],
  });

  private plus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__plus"],
    textContent: "+",
    eventType: "click",
    callback: this.changeQuantity.bind(this, 1),
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-line"],
    children: [
      this.name,
      this.price,
      this.currency,
      this.minus,
      this.quantity,
      this.plus,
    ],
  });

  constructor(product: LineItem, cart: Cart) {
    this.cart = cart;
    this.product = product;

    this.name.getHTMLElement().textContent = product.name["en-GB"];
    this.price.getHTMLElement().textContent = `${product.price.value.centAmount / 100}`;
    this.currency.getHTMLElement().textContent =
      product.price.value.currencyCode;
    this.quantity.getHTMLElement().textContent = `${product.quantity}`;
  }

  private changeQuantity(change: number) {
    if (!this.product?.quantity) return;
    const newQuantity = this.product.quantity + change;
    fetchChangeQuantity(this.cart, this.product.id, newQuantity)
      .then((response) => {
        this.cart.version = response.body.version;
        // console.log("response.body: ", response.body);
        this.product = response.body.lineItems.find(
          (lineItem) => lineItem.id === this.product.id,
        )!;
        this.quantity.getHTMLElement().textContent = `${newQuantity}`;
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
