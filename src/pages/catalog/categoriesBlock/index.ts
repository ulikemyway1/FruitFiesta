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

  private sortPriceSelect = new CreateElement<HTMLSelectElement>({
    tag: "select",
    cssClasses: ["catalog-header__sort-select"],
    children: [
      new CreateElement({
        tag: "option",
        textContent: "None",
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
    callback: (event) => {
      const select = event.target as HTMLSelectElement;
      const { value } = select.options[select.selectedIndex];
      const searchParams = new URLSearchParams(
        window.location.hash.split("?")[1] || "",
      );
      if (value === "default") {
        searchParams.delete("sort");
      } else {
        searchParams.set("sort", value);
      }
      window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
    },
  });

  private sortNameSelect = new CreateElement<HTMLSelectElement>({
    tag: "select",
    cssClasses: ["catalog-header__sort-select"],
    children: [
      new CreateElement({
        tag: "option",
        textContent: "None",
        attributes: { value: "default" },
      }),
      new CreateElement({
        tag: "option",
        textContent: "A to Z",
        attributes: { value: "name.en-GB asc" },
      }),
      new CreateElement({
        tag: "option",
        textContent: "Z to A",
        attributes: { value: "name.en-GB desc" },
      }),
    ],
    eventType: "change",
    callback: (event) => {
      const select = event.target as HTMLSelectElement;
      const { value } = select.options[select.selectedIndex];
      const searchParams = new URLSearchParams(
        window.location.hash.split("?")[1] || "",
      );
      if (value === "default") {
        searchParams.delete("sort");
      } else {
        searchParams.set("sort", value);
      }
      window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
    },
  });

  private sort = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__sort"],
    children: [
      new CreateElement({ tag: "span", textContent: "Sort by: " }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__sort-label"],
        textContent: "Price ",
        children: [this.sortPriceSelect],
      }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__sort-label"],
        textContent: "Name ",
        children: [this.sortNameSelect],
      }),
    ],
  });

  private search = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["catalog-header__search"],
    attributes: { type: "search", placeholder: "Search" },
    eventType: "keyup",
    callback: (event) => {
      if ((event as KeyboardEvent).key === "Enter") {
        const searchParams = new URLSearchParams(
          window.location.hash.split("?")[1] || "",
        );
        searchParams.set(
          "search-text",
          (event.target as HTMLInputElement).value,
        );
        window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
      }
    },
  });

  private filter = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__filter"],
    children: [
      new CreateElement({ tag: "span", textContent: "Filter: " }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__filter-label"],
        textContent: "Price from(EUR): ",
        children: [
          new CreateElement<HTMLInputElement>({
            tag: "input",
            cssClasses: ["catalog-header__filter-input"],
            attributes: { type: "number", placeholder: "0" },
          }),
        ],
      }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__filter-label"],
        textContent: "to(EUR): ",
        children: [
          new CreateElement<HTMLInputElement>({
            tag: "input",
            cssClasses: ["catalog-header__filter-input"],
            attributes: { type: "number", placeholder: "100" },
          }),
        ],
      }),
      new CreateElement({
        tag: "button",
        cssClasses: ["catalog-header__filter-button"],
        textContent: "Apply",
        eventType: "click",
        callback: () => {
          const searchParams = new URLSearchParams(
            window.location.hash.split("?")[1] || "",
          );
          const from =
            Number(
              this.filter.getHTMLElement().querySelectorAll("input")[0].value,
            ) * 100 || "0";
          const to =
            Number(
              this.filter.getHTMLElement().querySelectorAll("input")[1].value,
            ) * 100 || "*";
          searchParams.set("price", `${from} to ${to}`);
          window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
        },
      }),
    ],
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

  constructor(
    categories: Category[],
    pathArr?: string[],
    searchParams?: URLSearchParams,
  ) {
    this.categories = categories;

    this.renderCatalogPath(pathArr);

    this.renderAvailableCategory(pathArr, categories);

    this.sortPriceSelect.getHTMLElement().value =
      searchParams?.get("sort") || "default";
    this.sortNameSelect.getHTMLElement().value =
      searchParams?.get("sort") || "default";
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