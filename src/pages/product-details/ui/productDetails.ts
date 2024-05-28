import "./productDetails.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import fetchProductByProductKey from "../api";
import Router from "../../../app/routing/model/router";
import notFoundPageView from "../../notFound";

export default class ProductDetailsView {
  private product: ProductProjection | undefined;

  private img = new CreateElement({
    tag: "img",
    cssClasses: ["product-details__img"],
    attributes: {
      alt: "ProductImg",
    },
  });

  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["product-details__title"],
    textContent: "Some title",
  });

  private text = new CreateElement({
    tag: "div",
    cssClasses: ["product-details__description"],
    textContent: "Some text.",
  });

  private price = new CreateElement({
    tag: "div",
    cssClasses: ["product-details__price"],
    textContent: "Price: ",
  });

  private discountPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-details__discount-price"],
    textContent: "Discount price: ",
  });

  private buyButton = new CreateElement({
    tag: "button",
    cssClasses: ["buy-button"],
    textContent: "BUY",
    eventType: "click",
    callback: this.handleBuyButton.bind(this),
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["product-details__content"],
    children: [
      this.img,
      this.title,
      this.text,
      this.price,
      this.discountPrice,
      this.buyButton,
    ],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-details"],
    children: [this.img, this.content],
  });

  constructor(key: string) {
    this.getProductByProductKey(key)
      .then((product) => {
        console.log(product);
        this.product = product;
        this.render();
      })
      .catch(() => {
        Router.switchContent(notFoundPageView);
      });
  }

  async getProductByProductKey(key: string) {
    const { body } = await fetchProductByProductKey(key);
    return body;
  }

  private render() {
    if (!this.product) {
      return;
    }
    this.title.getHTMLElement().textContent = this.product.name
      ? this.product.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = this.product.description
      ? this.product.description["en-GB"]
      : "";
    this.product.masterVariant.prices?.forEach((price) => {
      this.price
        .getHTMLElement()
        .append(`${price.value.centAmount / 100} ${price.value.currencyCode}`);
      if (price.discounted) {
        this.discountPrice
          .getHTMLElement()
          .append(
            `${price.discounted.value.centAmount / 100} ${
              price.discounted.value.currencyCode
            }`
          );
      }
    });
    if (this.product.masterVariant.images?.[0]?.url) {
      this.img
        .getHTMLElement()
        .setAttribute("src", this.product.masterVariant.images[0].url);
    }
  }

  private handleBuyButton(event: Event) {
    event.stopPropagation();
    console.log("Buy button clicked");
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
