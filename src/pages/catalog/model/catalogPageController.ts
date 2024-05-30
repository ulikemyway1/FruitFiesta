import { Category } from "@commercetools/platform-sdk";
import { fetchCategories } from "../api";
import CatalogPageView from "../ui/catalogPageView";
// import CatalogPageModel from "./catalogPageModel";
import ProductsBlockView from "../productsBlock";
import CategoriesBlockView from "../categoriesBlock";

class CatalogPageController {
  // model = CatalogPageModel;

  private categories: Category[] = [];

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor(path?: string[]) {
    this.getCategories().then((categories) => {
      this.categories = categories;

      let queryArgs;
      if (path) {
        const categoryId = this.getLastCategoryIdByPathSlug(path);
        queryArgs = {
          // filter: `categories.id: subtree("${path.pop()}")`,
          filter: `categories.id: subtree("${categoryId}")`,
        };
      }
      this.view.appendContent(
        new CategoriesBlockView(categories, path).getHTMLElement(),
      );

      this.view.appendContent(
        new ProductsBlockView(queryArgs).getHTMLElement(),
      );
    });

    // let queryArgs;
    // if (path) {
    //   // console.log("Path: ", path);
    //   queryArgs = {
    //     filter: `categories.id: subtree("${path.pop()}")`,
    //   };
    // }
    // this.view.appendContent(new CategoriesBlockView(path).getHTMLElement());

    // this.view.appendContent(new ProductsBlockView(queryArgs).getHTMLElement());
  }

  private async getCategories() {
    const response = await fetchCategories();
    return response.body.results;
  }

  private getLastCategoryIdByPathSlug(path: string[]) {
    const categorySlug = path[path.length - 1];
    const category = this.categories.find(
      (item) => item.slug["en-GB"] === categorySlug,
    );
    return category?.id;
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default CatalogPageController;
