import "./index.scss";
import CreateElement from "../../shared/helpers/element-create";
import fetchDiscountCodes from "./api";
import DiscountCardView from "../discountCard";

export default class DiscountBlockView {
  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["discount-block__title"],
    textContent: "Discounts and promotions",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["discount-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["discount-block"],
    children: [this.title, this.content],
  });

  constructor() {
    fetchDiscountCodes().then((response) => {
      response.body.results.forEach((discount) => {
        const discountCard = new DiscountCardView(discount);
        this.content.addInnerElements(discountCard.getHTMLElement());
      });
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
