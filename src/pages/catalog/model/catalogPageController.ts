import CatalogPageView from "../ui/catalogPageView";
import CatalogPageModel from "./catalogPageModel";
import ProductCardView from "../../../widgets/productCard";

class CatalogPageController {
  model = CatalogPageModel;

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor() {
    this.model.getProducts().then((products) => {
      products.forEach((product) => {
        console.log(product);
        this.view.appendContent(new ProductCardView(product).getHTMLElement());
      });
    });
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new CatalogPageController();
