import "./discountCard.scss";
import CreateElement from "../../../shared/helpers/element-create";

export default class DiscountCardView {
  title = new CreateElement({
    tag: "h2",
    cssClasses: ["discount-card__title"],
    textContent: "Some title",
  });

  text = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__text"],
    textContent: "Some text.",
  });

  promoCode = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card__promo-code"],
    textContent: "Some promo code",
  });

  container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-card"],
    children: [this.title, this.text, this.promoCode],
  });

  constructor({
    title = "Some title",
    text = "Some text",
    promoCode = "Some promo code",
  }) {
    this.title.getHTMLElement().textContent = title;
    this.text.getHTMLElement().textContent = text;
    this.promoCode.getHTMLElement().textContent = promoCode;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
