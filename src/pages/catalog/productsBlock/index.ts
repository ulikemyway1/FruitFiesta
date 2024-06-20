import "./index.scss";
import { ProductProjection } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import ProductCardView from "../../../widgets/productCard";

export default class ProductsBlockView {
  private content = new CreateElement({
    tag: "div",
    cssClasses: ["products-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["products-block"],
    children: [this.content],
  });

  constructor(products: ProductProjection[]) {
    products.forEach((product) => {
      this.content.addInnerElements(
        new ProductCardView(product).getHTMLElement(),
      );
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
