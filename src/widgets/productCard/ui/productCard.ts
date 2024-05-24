import "./productCard.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

export default class ProductCardView {
  private img = new CreateElement({
    tag: "img",
    cssClasses: ["product-card__img"],
    attributes: {
      alt: "ProductImg",
    },
  });

  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["product-card__title"],
    textContent: "Some title",
  });

  private text = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__description"],
    textContent: "Some text.",
  });

  private price = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__price"],
    textContent: "Price: ",
  });

  private discountPrice = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__discount-price"],
    textContent: "Discount price: ",
  });

  // можно сделать какую надо и вынести в компоненты
  private buyButton = new CreateElement({
    tag: "button",
    cssClasses: ["buy-button"],
    textContent: "BUY",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__content"],
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
    cssClasses: ["product-card"],
    children: [this.img, this.content],
  });

  constructor(product: ProductProjection) {
    this.title.getHTMLElement().textContent = product.name
      ? product.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = product.description
      ? product.description["en-GB"]
      : "";
    product.masterVariant.prices?.forEach((price) => {
      this.price
        .getHTMLElement()
        .append(`${price.value.centAmount / 100} ${price.value.currencyCode}`);
      if (price.discounted) {
        this.discountPrice
          .getHTMLElement()
          .append(
            `${price.discounted.value.centAmount / 100} ${price.discounted.value.currencyCode}`,
          );
      }
    });
    if (product.masterVariant.images?.[0]?.url) {
      this.img
        .getHTMLElement()
        .setAttribute("src", product.masterVariant.images[0].url);
    }
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
