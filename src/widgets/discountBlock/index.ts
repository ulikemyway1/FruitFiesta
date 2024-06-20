import "./index.scss";
import CreateElement from "../../shared/helpers/element-create";
import { fetchDiscountCodes, fetchProductDiscounts } from "./api";
import DiscountCodeCardView from "../discountCodeCard";
import ProductDiscountView from "../productDiscountCard";
import discountsState from "../../shared/state/discounts/discounts";

export default class DiscountBlockView {
  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["discount-block__title"],
    textContent: "Weekly Promotions",
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

  private discountSection = new CreateElement({
    tag: "section",
    cssClasses: ["discount"],
  });

  constructor() {
    fetchDiscountCodes().then((response) => {
      discountsState.discountCodes = response.body.results;
      response.body.results.forEach((discountCode) => {
        const discountCodeCard = new DiscountCodeCardView(discountCode);
        this.content.addInnerElements(discountCodeCard.getHTMLElement());
      });
    });
    this.discountSection
      .getHTMLElement()
      .append(this.container.getHTMLElement());

    fetchProductDiscounts().then((response) => {
      discountsState.productDiscounts = response.body.results;
      response.body.results.forEach((productDiscount) => {
        const discountCard = new ProductDiscountView(productDiscount);
        this.content.addInnerElements(discountCard.getHTMLElement());
      });
    });
  }

  getHTMLElement(): HTMLElement {
    return this.discountSection.getHTMLElement();
  }
}
