import "./discountCard.scss";
import { DiscountCode } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

import discountSvg from "../../../assets/images/coupon-svgrepo-com.svg";

export default class DiscountCardView {
  img = new CreateElement({
    tag: "img",
    cssClasses: ["discount-card__img"],
    attributes: {
      src: discountSvg,
      alt: "Discount",
    },
  });

  title = new CreateElement({
    tag: "h2",
    cssClasses: ["discount-card__title"],
    textContent: "Some title",
  });

  text = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__description"],
    textContent: "Some text.",
  });

  promoCode = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__promo-code"],
    textContent: "Some promo code",
  });

  content = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__content"],
    children: [this.img, this.title, this.text, this.promoCode],
  });

  container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card"],
    children: [this.img, this.content],
  });

  constructor(discount: DiscountCode) {
    this.title.getHTMLElement().textContent = discount.name
      ? discount.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = discount.description
      ? discount.description["en-GB"]
      : "";
    this.promoCode.getHTMLElement().textContent = discount.code;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
