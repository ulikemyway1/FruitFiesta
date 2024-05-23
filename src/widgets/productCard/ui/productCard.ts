import "./productCard.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

export default class DiscountCardView {
  img = new CreateElement({
    tag: "img",
    cssClasses: ["product-card__img"],
    attributes: {
      // src: discountSvg,
      alt: "ProductImg",
    },
  });

  title = new CreateElement({
    tag: "h2",
    cssClasses: ["product-card__title"],
    textContent: "Some title",
  });

  text = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__description"],
    textContent: "Some text.",
  });

  content = new CreateElement({
    tag: "div",
    cssClasses: ["product-card__content"],
    children: [this.img, this.title, this.text],
  });

  container = new CreateElement({
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
    this.img
      .getHTMLElement()
      .setAttribute("src", product?.masterVariant?.images?.[0]?.url ?? "");
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
