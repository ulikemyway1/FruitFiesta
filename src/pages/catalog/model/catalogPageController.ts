import CatalogPageView from "../ui/catalogPageView";
// import CatalogPageModel from "./catalogPageModel";
import ProductsBlockView from "../productsBlock";
import CategoriesBlockView from "../categoriesBlock";

class CatalogPageController {
  // model = CatalogPageModel;

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor(path?: string[]) {
    let queryArgs;
    if (path) {
      // console.log("Path: ", path);
      queryArgs = {
        filter: `categories.id: subtree("${path.pop()}")`,
      };
    }
    this.view.appendContent(new CategoriesBlockView(path).getHTMLElement());

    this.view.appendContent(new ProductsBlockView(queryArgs).getHTMLElement());
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default CatalogPageController;
