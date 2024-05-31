import "./index.scss";
import { Category } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchCategories } from "../api";
import Hash from "../../../shared/routs/enumHash";

export default class CategoriesBlockView {
  private categories: Category[] = [];

  private breadcrumbs = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__breadcrumbs"],
  });

  private availableCategories = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__categories"],
  });

  private sort = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__sort"],
    children: [
      new CreateElement({ tag: "span", textContent: "Sort by: " }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__sort-label"],
        textContent: "Price",
        children: [
          new CreateElement({
            tag: "select",
            cssClasses: ["catalog-header__sort-select"],
            children: [
              new CreateElement({
                tag: "option",
                textContent: "---",
                attributes: { value: "default" },
              }),
              new CreateElement({
                tag: "option",
                textContent: "Low to High",
                attributes: { value: "price asc" },
              }),
              new CreateElement({
                tag: "option",
                textContent: "High to Low",
                attributes: { value: "price desc" },
              }),
            ],
            eventType: "change",
            callback: () => {
              // const select = event.target as HTMLSelectElement;
              // const { value } = select.options[select.selectedIndex];
              // const searchParams = new URLSearchParams(window.location.search);
              // searchParams.set("sort", value);
              // window.location.search = searchParams.toString();
            },
          }),
        ],
      }),
    ],
  });

  private search = new CreateElement({
    tag: "input",
    cssClasses: ["catalog-header__search"],
    attributes: { type: "text", placeholder: "Search" },
  });

  private filter = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__filter"],
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__content"],
    children: [
      this.breadcrumbs,
      this.availableCategories,
      this.sort,
      this.search,
      this.filter,
    ],
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
    this.breadcrumbs.addInnerElements(
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
