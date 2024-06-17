import "./productLine.scss";
import { Cart, LineItem } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchChangeQuantity, fetchRemoveFromCart } from "../apiBasket";

import basketModel from "../basketModel";
import modalLoadingScreen from "../../../widgets/modalLoadingScreen/modalLoadingScreen";

export default class ProductLine {
  private product: LineItem;

  setCartTotalPrice: (cart: Cart) => void;

  deleteCart: () => void;

  private img = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["product-line__img"],
  });

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

  private currency = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__currency"],
  });

  private priceBlock = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__price-block"],
    children: [this.price, this.discountPrice, this.currency],
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
    callback: this.changeQuantityHandler.bind(this, -1),
  });

  private plus = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__plus"],
    textContent: "+",
    eventType: "click",
    callback: this.changeQuantityHandler.bind(this, 1),
  });

  private totalLineItemPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__total-line-item-price"],
  });

  private totalLineItemDiscountedPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__total-line-item-discounted-price"],
  });

  private totalLineItemCurrency = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__total-line-item-currency"],
  });

  private totalLineItemPriceBlock = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__total-line-item-price-block"],
    children: [
      this.totalLineItemPrice,
      this.totalLineItemDiscountedPrice,
      this.totalLineItemCurrency,
    ],
  });

  private minusQuantityPlusBlock = new CreateElement({
    tag: "div",
    cssClasses: ["product-line__minus-quantity-plus-block"],
    children: [
      this.minus,
      this.quantity,
      this.plus,
      this.totalLineItemPriceBlock,
    ],
  });

  private delete = new CreateElement({
    tag: "button",
    cssClasses: ["product-line__delete"],
    textContent: "Delete",
    eventType: "click",
    callback: this.removeProductHandler.bind(this),
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-line"],
    children: [
      this.img,
      this.name,
      this.priceBlock,
      this.minusQuantityPlusBlock,
      this.delete,
    ],
  });

  constructor(
    product: LineItem,
    setCartTotalPrice: (cart: Cart) => void,
    deleteCart: () => void,
  ) {
    this.product = product;
    this.setCartTotalPrice = setCartTotalPrice;
    this.deleteCart = deleteCart;

    this.name.getHTMLElement().textContent = product.name["en-GB"];
    if (product.variant.images?.length)
      this.img.getHTMLElement().src = product.variant.images[0].url;

    this.price.getHTMLElement().textContent = `${
      product.price.value.centAmount / 100
    }`;
    if (product.price.discounted) {
      this.discountPrice.getHTMLElement().textContent = `${
        product.price.discounted.value.centAmount / 100
      }`;
      this.price.getHTMLElement().style.textDecoration = "line-through";
    } else if (product.discountedPricePerQuantity.length) {
      this.discountPrice.getHTMLElement().textContent = `${
        product.discountedPricePerQuantity[0].discountedPrice.value.centAmount /
        100
      }`;
      this.price.getHTMLElement().style.textDecoration = "line-through";
    }
    this.currency.getHTMLElement().textContent =
      product.price.value.currencyCode;

    this.quantity.getHTMLElement().textContent = `${product.quantity}`;

    // start

    this.renderTotalLineItemPrice(product);

    // finish

    this.totalLineItemCurrency.getHTMLElement().textContent =
      product.totalPrice.currencyCode;
  }

  private async changeQuantityHandler(change: number) {
    document.body.append(modalLoadingScreen.getHTMLElement());

    if (!this.product?.quantity) return;
    const newQuantity = this.product.quantity + change;
    const cart = await basketModel.getCart();
    fetchChangeQuantity(cart, this.product.id, newQuantity)
      .then((response) => {
        basketModel.cart = response.body;
        this.product = response.body.lineItems.find(
          (lineItem) => lineItem.id === this.product.id,
        )!;
        if (!basketModel.cart.lineItems.length) {
          this.deleteCart();
          return;
        }
        if (newQuantity === 0) {
          this.container.getHTMLElement().remove();
          this.setCartTotalPrice(response.body);
          return;
        }
        this.quantity.getHTMLElement().textContent = `${this.product.quantity}`;

        this.renderTotalLineItemPrice(this.product);

        this.setCartTotalPrice(response.body);
      })
      .catch((error) => {
        console.log("Error while changing quantity: ", error);
      })
      .finally(() => {
        modalLoadingScreen.close();
      });
  }

  private renderTotalLineItemPrice(product: LineItem) {
    this.totalLineItemPrice.getHTMLElement().textContent = `${
      product.totalPrice.centAmount / 100
    }`;
    if (product.price.discounted) {
      this.totalLineItemPrice.getHTMLElement().textContent = `${
        (product.price.value.centAmount * product.quantity) / 100
      }`;
      this.totalLineItemPrice.getHTMLElement().style.textDecoration =
        "line-through";
      this.totalLineItemDiscountedPrice.getHTMLElement().textContent = `${
        product.totalPrice.centAmount / 100
      }`;
    } else if (product.discountedPricePerQuantity.length) {
      this.totalLineItemPrice.getHTMLElement().textContent = `${
        (product.price.value.centAmount * product.quantity) / 100
      }`;
      this.totalLineItemPrice.getHTMLElement().style.textDecoration =
        "line-through";
      this.totalLineItemDiscountedPrice.getHTMLElement().textContent = `${
        product.totalPrice.centAmount / 100
      }`;
    }
  }

  private async removeProductHandler() {
    document.body.append(modalLoadingScreen.getHTMLElement());

    const cart = await basketModel.getCart();
    fetchRemoveFromCart(cart, this.product.id)
      .then((response) => {
        basketModel.cart = response.body;
        if (!basketModel.cart.lineItems.length) {
          this.deleteCart();
          return;
        }
        this.setCartTotalPrice(response.body);
        this.container.getHTMLElement().remove();
      })
      .catch((error) => {
        console.log("Error while removing product: ", error);
      })
      .finally(() => {
        modalLoadingScreen.close();
      });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
