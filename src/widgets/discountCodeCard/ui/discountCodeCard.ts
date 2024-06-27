import "./discountCodeCard.scss";
import { DiscountCode } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";

import discountSvg from "../../../assets/images/coupon-svgrepo-com.svg";
import ModalMessage from "../../modalMessage/modalMessage";

export default class DiscountCodeCardView {
  private discountCode: DiscountCode;

  private img = new CreateElement({
    tag: "img",
    cssClasses: ["discount-code-card__img"],
    attributes: {
      src: discountSvg,
      alt: "Discount",
    },
  });

  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["discount-code-card__title"],
    textContent: "Some title",
  });

  private text = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-card__description"],
    textContent: "Some text.",
  });

  private promoCode = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-card__promo-code"],
    textContent: "Promo code: ",
  });

  private advice = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-card__advice"],
    textContent: "Click card to copy promo code to clipboard.",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-card__content"],
    children: [this.img, this.title, this.text, this.promoCode, this.advice],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-code-card"],
    children: [this.content],
    eventType: "click",
    callback: this.copyToClipboard.bind(this),
  });

  constructor(discountCode: DiscountCode) {
    this.discountCode = discountCode;

    this.title.getHTMLElement().textContent = discountCode.name
      ? discountCode.name["en-GB"]
      : "";
    this.text.getHTMLElement().textContent = discountCode.description
      ? discountCode.description["en-GB"]
      : "";
    this.promoCode.getHTMLElement().append(discountCode.code);
  }

  private copyToClipboard() {
    if (!this.discountCode.code) {
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.discountCode.code).then(
        () => {
          document.body.append(
            new ModalMessage(
              `Promo code ${this.discountCode.code} was copied to clipboard`,
            ).getHTMLElement(),
          );
        },
        (err) => {
          console.log("Failed to copy promo code to clipboard", err);
        },
      );
    } else {
      this.fallbackCopyToClipboard(this.discountCode.code);
    }
  }

  private fallbackCopyToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.append(
        new ModalMessage(
          `Promo code ${this.discountCode.code} was copied to clipboard`,
        ).getHTMLElement(),
      );
    } catch (err) {
      console.log("Failed to copy promo code to clipboard", err);
    }
    textArea.remove();
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
