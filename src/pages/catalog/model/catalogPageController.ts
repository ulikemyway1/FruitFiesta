import CatalogPageView from "../ui/catalogPageView";
// import CatalogPageModel from "./catalogPageModel";
import ProductsBlockView from "../productsBlock";
import CategoriesBlockView from "../categoriesBlock";

class CatalogPageController {
  // model = CatalogPageModel;

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor(queryArgs?: { filter: string }) {
    this.view.appendContent(new CategoriesBlockView().getHTMLElement());

    this.view.appendContent(new ProductsBlockView(queryArgs).getHTMLElement());
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default CatalogPageController;
