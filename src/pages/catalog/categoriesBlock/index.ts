import "./index.scss";
import { Category } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchCategories } from "../api";
import Hash from "../../../shared/routs/enumHash";

export default class CategoriesBlockView {
  private categories: Category[] = [];

  private catalogPath = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__breadcrumbs"],
  });

  private availableCategories = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__categories"],
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__content"],
    children: [this.catalogPath, this.availableCategories],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header"],
    children: [this.content],
  });

  constructor(categories: Category[], path?: string[]) {
    this.categories = categories;

    this.renderCatalogPath(path);

    this.renderAvailableCategory(path, categories);
  }

  private renderAvailableCategory(
    path: string[] | undefined,
    categories: Category[],
  ) {
    const availableCategories = !path
      ? categories.filter((category) => category.parent === undefined)
      : categories.filter(
          (category) =>
            category.parent?.id === this.getLastCategoryIdByPathSlug(path),
        );

    availableCategories.forEach((category) => {
      this.availableCategories.addInnerElements(
        new CreateElement({
          tag: "button",
          cssClasses: ["catalog-header__category-button"],
          textContent: category.name["en-GB"],
          eventType: "click",
          callback: this.handleCategoryClick.bind(this, category),
        }).getHTMLElement(),
      );
    });
  }

  private renderCatalogPath(path: string[] | undefined) {
    this.catalogPath.addInnerElements(
      new CreateElement({
        tag: "div",
        cssClasses: ["catalog-header__breadcrumbs"],
        children: [
          new CreateElement({
            tag: "button",
            cssClasses: ["catalog-header__breadcrumbs-item"],
            textContent: Hash.CATALOG.slice(1),
            eventType: "click",
            callback: () => {
              window.location.hash = Hash.CATALOG;
            },
          }).getHTMLElement(),
          ...(path?.map((item) =>
            new CreateElement({
              tag: "button",
              cssClasses: ["catalog-header__breadcrumbs-item"],
              textContent: `/${item}`,
              eventType: "click",
              callback: () => {
                window.location.hash = `${Hash.CATALOG}/${path
                  .slice(0, path.indexOf(item) + 1)
                  .join("/")}`;
              },
            }).getHTMLElement(),
          ) || []),
        ],
      }),
    );
  }

  async getCategories() {
    const response = await fetchCategories();
    return response.body.results;
  }

  private getCategorySlugById(id: string) {
    return this.categories.find((category) => category.id === id)?.slug[
      "en-GB"
    ];
  }

  private getLastCategoryIdByPathSlug(path: string[]) {
    const categorySlug = path[path.length - 1];
    const category = this.categories.find(
      (item) => item.slug["en-GB"] === categorySlug,
    );
    return category?.id;
  }

  private handleCategoryClick(category: Category) {
    const midPath = category.ancestors
      .map((ancestor) => this.getCategorySlugById(ancestor.id))
      .join("/");

    window.location.hash = `${Hash.CATALOG}/${midPath.length ? midPath.concat("/") : ""}${category.slug["en-GB"]}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
