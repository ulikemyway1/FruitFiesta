import "./index.scss";
import CreateElement from "../../shared/helpers/element-create";
import fetchProductProjections from "./api";
import ProductCardView from "../productCard";

export default class RandomProdBlockView {
  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["random-prod-block__title"],
    textContent: "Our products",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["random-prod-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["random-prod-block"],
    children: [this.title, this.content],
  });

  constructor() {
    this.getRandomProducts().then((products) => {
      products.forEach((product) => {
        // console.log(product);
        this.content
          .getHTMLElement()
          .append(new ProductCardView(product).getHTMLElement());
      });
    });
  }

  async getRandomProducts(num_of_random_products = 3) {
    const response = await fetchProductProjections();
    const randomProducts = [];
    const productsAmount = response.body.results.length;
    for (
      let i = 0;
      i < Math.min(productsAmount, num_of_random_products);
      i += 1
    ) {
      const randomProduct =
        response.body.results[Math.floor(Math.random() * response.body.count)];
      randomProducts.push(randomProduct);
    }
    return randomProducts;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
