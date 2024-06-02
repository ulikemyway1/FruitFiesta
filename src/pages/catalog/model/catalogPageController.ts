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

      // queryArgs.sort = "price desc";
      // queryArgs.sort = "name.en-GB desc";
      // queryArgs.sort = ["price desc", "name.en-GB asc"];

      searchParams.forEach((value, key) => {
        if (Object.prototype.hasOwnProperty.call(queryArgs, key)) {
          if (Array.isArray(queryArgs[key])) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            queryArgs[key].push(value);
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            queryArgs[key] = [queryArgs[key], value];
          }
        } else {
          if (key === "price") {
            if (Array.isArray(queryArgs.filter)) {
              queryArgs.filter.push(
                `variants.price.centAmount: range(${value})`,
              );
              return;
            }
            queryArgs.filter = [`variants.price.centAmount: range(${value})`];
            return;
          }
          if (key === "text") {
            queryArgs["text.en-GB"] = value;
            queryArgs.fuzzy = true;
            return;
          }
          queryArgs[key] = value;
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
