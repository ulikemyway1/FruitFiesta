import "./productDiscountCard.scss";
import { ProductDiscount } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

// import discountSvg from "../../../assets/images/coupon-svgrepo-com.svg";

export default class ProductDiscountCardView {
  private productDiscount: ProductDiscount;

  // private img = new CreateElement({
  //   tag: "img",
  //   cssClasses: ["product-discount-card__img"],
  //   attributes: {
  //     src: discountSvg,
  //     alt: "Discount",
  //   },
  // });

  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["product-discount-card__title"],
    textContent: "Some title",
  });

  private text = new CreateElement({
    tag: "div",
    cssClasses: ["product-discount-card__description"],
    textContent: "Some text.",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["product-discount-card__content"],
    children: [this.title, this.text],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["product-discount-card"],
    children: [this.content],
  });

  constructor(productDiscount: ProductDiscount) {
    this.productDiscount = productDiscount;

    this.title.getHTMLElement().textContent = productDiscount.name
      ? productDiscount.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = productDiscount.description
      ? productDiscount.description["en-GB"]
      : "";
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
