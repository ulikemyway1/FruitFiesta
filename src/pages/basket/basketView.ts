import "./basket.scss";
import { Cart } from "@commercetools/platform-sdk";
import CreateElement from "../../shared/helpers/element-create";
import ProductLine from "./productLine/productLine";

export default class BasketView {
  private content = new CreateElement({
    tag: "div",
    cssClasses: ["basket__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["basket"],
    children: [this.content],
  });

  render(cart: Cart) {
    cart.lineItems.forEach((product) => {
      const productLine = new ProductLine(product);
      this.content.addInnerElements(productLine.getHTMLElement());
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
