import { Category } from "@commercetools/platform-sdk";
import { fetchCategories } from "../api";
import CatalogPageView from "../ui/catalogPageView";
// import CatalogPageModel from "./catalogPageModel";
import ProductsBlockView from "../productsBlock";
import CategoriesBlockView from "../categoriesBlock";
import Hash from "../../../shared/routs/enumHash";

class CatalogPageController {
  // model = CatalogPageModel;

  private categories: Category[] = [];

  view = new CatalogPageView();

  // loadProducts() {  // If we want lazy loading of products
  constructor(hash: string) {
    const [route, searchStr] = hash.split("?");
    const searchParams = new URLSearchParams(searchStr);
    const pathArr = route
      .replace(`${Hash.CATALOG}`, "")
      .split("/")
      .filter((item) => item);

    this.getCategories().then((categories) => {
      // console.log("Categories: ", categories);

      this.categories = categories;

      const queryArgs: { [key: string]: string | string[] | number | boolean } =
        {};

      if (pathArr.length) {
        const categoryId = this.getLastCategoryIdByPathSlug(pathArr);
        queryArgs.filter = [`categories.id: subtree("${categoryId}")`];
      }

      searchParams.forEach((value, key) => {
        switch (key) {
        case "sort-price":
          queryArgs.sort = [`price ${value}`];
          break;
        case "sort-name":
          if (Array.isArray(queryArgs.sort)) {
            queryArgs.sort.push(`name.en-GB ${value}`);
          } else {
            queryArgs.sort = [`name.en-GB ${value}`];
          }
          break;

        case "price":
          if (Array.isArray(queryArgs.filter)) {
            queryArgs.filter.push(
              `variants.price.centAmount: range(${value})`,
            );
          } else {
            queryArgs.filter = [`variants.price.centAmount: range(${value})`];
          }
          break;
        case "food":
          if (Array.isArray(queryArgs.filter)) {
            queryArgs.filter.push(`variants.attributes.is-it-food: ${value}`);
          } else {
            queryArgs.filter = [`variants.attributes.is-it-food: ${value}`];
          }
          break;
        case "cosmetics":
          if (Array.isArray(queryArgs.filter)) {
            queryArgs.filter.push(
              `variants.attributes.is-it-cosmetics: ${value}`,
            );
          } else {
            queryArgs.filter = [
              `variants.attributes.is-it-cosmetics: ${value}`,
            ];
          }
          break;

        case "text":
          queryArgs["text.en-GB"] = value;
          queryArgs.fuzzy = true;
          break;

        default:
          console.log("Unknown query parameter: ", key);
        }
      });

      this.view.appendContent(
        new CategoriesBlockView(
          categories,
          pathArr,
          searchParams,
        ).getHTMLElement(),
      );

      // console.log("QueryArgs: ", queryArgs);

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
