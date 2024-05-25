import "./discountCard.scss";
import { DiscountCode } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

import discountSvg from "../../../assets/images/coupon-svgrepo-com.svg";

export default class DiscountCardView {
  discount: DiscountCode;

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
    textContent: "Promo code: ",
  });

  advice = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__advice"],
    textContent: "Click card to copy promo code to clipboard.",
  });

  content = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__content"],
    children: [this.img, this.title, this.text, this.promoCode, this.advice],
  });

  container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card"],
    children: [this.content],
    eventType: "click",
    callback: this.copyToClipboard.bind(this),
  });

  constructor(discount: DiscountCode) {
    this.discount = discount;

    this.title.getHTMLElement().textContent = discount.name
      ? discount.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = discount.description
      ? discount.description["en-GB"]
      : "";
    this.promoCode.getHTMLElement().append(discount.code);
  }

  copyToClipboard() {
    if (!this.discount.code) {
      return;
    }
    navigator.clipboard.writeText(this.discount.code).then(
      () => {
        console.log(`Promo code ${this.discount.code} copied to clipboard`);
      },
      (err) => {
        console.error("Failed to copy promo code to clipboard", err);
      },
    );
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
