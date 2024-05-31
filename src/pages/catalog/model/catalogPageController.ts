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
  constructor(searchParams: URLSearchParams, pathArr: string[]) {
    this.getCategories().then((categories) => {
      console.log("Categories: ", categories);
      this.categories = categories;

      const queryArgs: { [key: string]: string | string[] } = {};

      if (pathArr.length) {
        const categoryId = this.getLastCategoryIdByPathSlug(pathArr);
        queryArgs.filter = `categories.id: subtree("${categoryId}")`;
      }

      // queryArgs.sort = "price desc";
      // queryArgs.sort = "name.en-GB desc";
      // queryArgs.sort = ["price desc", "name.en-GB asc"];

      searchParams.forEach((value, key) => {
        let currentValue = queryArgs[key];
        if (Object.prototype.hasOwnProperty.call(queryArgs, key)) {
          if (Array.isArray(currentValue)) {
            currentValue.push(value);
          } else {
            currentValue = [currentValue, value];
          }
        } else {
          currentValue = value;
        }
      });

      this.view.appendContent(
        new CategoriesBlockView(categories, pathArr).getHTMLElement(),
      );

      this.view.appendContent(
        new ProductsBlockView(queryArgs).getHTMLElement(),
      );
    });
  }

  private async getCategories() {
    const response = await fetchCategories();
    return response.body.results;
  }

  private getLastCategoryIdByPathSlug(pathArr: string[]) {
    const categorySlug = pathArr[pathArr.length - 1];
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
