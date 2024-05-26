import CatalogPageView from "../ui/catalogPageView";
import CatalogPageModel from "./catalogPageModel";
import ProductCardView from "../../../widgets/productCard";
import CreateElement from "../../../shared/helpers/element-create";

class CatalogPageController {
  model = CatalogPageModel;

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor() {
    this.model.getCategories().then((categories) => {
      categories.forEach((category) => {
        console.log(category);
        this.view.appendContent(
          new CreateElement({
            tag: "div",
            cssClasses: ["category-button"],
            textContent: category.name["en-GB"],
            eventType: "click",
            callback: () => {
              console.log(category.id);
            },
          }).getHTMLElement(),
        );
      });
    });

    this.model.getProducts().then((products) => {
      products.forEach((product) => {
        // console.log(product);
        this.view.appendContent(new ProductCardView(product).getHTMLElement());
      });
    });
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new CatalogPageController();
