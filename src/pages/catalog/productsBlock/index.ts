import "./index.scss";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchProductProjections } from "../api";
import ProductCardView from "../../../widgets/productCard";

interface QueryArgs {
  filter?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
}

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

  constructor(queryArgs?: QueryArgs) {
    this.getProducts(queryArgs).then((products) => {
      products.forEach((product) => {
        // console.log(product);
        this.content.addInnerElements(
          new ProductCardView(product).getHTMLElement(),
        );
      });
    });
  }

  async getProducts(queryArgs?: QueryArgs) {
    const response = await fetchProductProjections(queryArgs);
    return response.body.results;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
