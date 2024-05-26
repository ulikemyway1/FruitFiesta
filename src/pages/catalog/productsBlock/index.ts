import "./index.scss";
import CreateElement from "../../../shared/helpers/element-create";
import fetchProductProjections from "./api";
import ProductCardView from "../../../widgets/productCard";

export default class ProductsBlockView {
  // private title = new CreateElement({
  //   tag: "h2",
  //   cssClasses: ["products-block__title"],
  //   textContent: "Our products",
  // });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["products-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["products-block"],
    children: [this.content],
  });

  constructor() {
    this.getProducts().then((products) => {
      products.forEach((product) => {
        // console.log(product);
        this.content.addInnerElements(
          new ProductCardView(product).getHTMLElement(),
        );
      });
    });
  }

  async getProducts() {
    const response = await fetchProductProjections();
    return response.body.results;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
