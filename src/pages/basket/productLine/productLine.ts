import "./productLine.scss";
import { LineItem } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchChangeQuantity, fetchRemoveFromCart } from "../apiBasket";

import basketModel from "../basketModel";

export default class ProductLine {
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

  private quantity = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__quantity"],
  });

  private minus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__minus"],
    textContent: "-",
    eventType: "click",
    callback: this.changeQuantity.bind(this, -1),
  });

  private plus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__plus"],
    textContent: "+",
    eventType: "click",
    callback: this.changeQuantity.bind(this, 1),
  });

  private delete = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__delete"],
    textContent: "✖",
    eventType: "click",
    callback: this.deleteProduct.bind(this),
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-line"],
    children: [
      this.name,
      this.price,
      this.currency,
      this.quantity,
      this.minus,
      this.plus,
      this.delete,
    ],
  });

  constructor(product: LineItem) {
    this.product = product;

    this.name.getHTMLElement().textContent = product.name["en-GB"];
    this.price.getHTMLElement().textContent = `${product.price.value.centAmount / 100}`;
    this.currency.getHTMLElement().textContent =
      product.price.value.currencyCode;
    this.quantity.getHTMLElement().textContent = `${product.quantity}`;
  }

  private async changeQuantity(change: number) {
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
        this.quantity.getHTMLElement().textContent = `${newQuantity}`;
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      });
  }

  private async deleteProduct() {
    // console.log(basketModel.cart);
    const cart = await basketModel.getCart();
    fetchRemoveFromCart(cart, this.product.id).then((response) => {
      basketModel.cart = response.body;
      this.container.getHTMLElement().remove();
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
