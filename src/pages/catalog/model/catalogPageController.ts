import CatalogPageView from "../ui/catalogPageView";
// import CatalogPageModel from "./catalogPageModel";
import ProductsBlockView from "../productsBlock";
import CategoriesBlockView from "../categoriesBlock";

class CatalogPageController {
  // model = CatalogPageModel;

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor() {
    this.view.appendContent(new CategoriesBlockView().getHTMLElement());

    this.view.appendContent(new ProductsBlockView().getHTMLElement());
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new CatalogPageController();
