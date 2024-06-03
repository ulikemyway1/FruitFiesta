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
        attributes: { value: "asc" },
      }),
      new CreateElement({
        tag: "option",
        textContent: "High to Low",
        attributes: { value: "desc" },
      }),
    ],
    eventType: "change",
    callback: (event) => {
      this.handleSort(event, "sort-price");
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
        attributes: { value: "asc" },
      }),
      new CreateElement({
        tag: "option",
        textContent: "Z to A",
        attributes: { value: "desc" },
      }),
    ],
    eventType: "change",
    callback: (event) => {
      this.handleSort(event, "sort-name");
    },
  });

  private sort = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__sort"],
    children: [
      new CreateElement({ tag: "span", textContent: "Sort by:" }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__sort-label"],
        textContent: "Price",
        children: [this.sortPriceSelect],
      }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__sort-label"],
        textContent: "Name",
        children: [this.sortNameSelect],
      }),
    ],
  });

  private searchInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["catalog-header__search-input"],
    attributes: { type: "search", placeholder: "Search" },
    eventType: "keyup",
    callback: (event) => {
      if ((event as KeyboardEvent).key === "Enter") {
        this.handleSearch();
      }
    },
  });

  private search = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__search"],
    children: [
      new CreateElement({
        tag: "button",
        cssClasses: ["catalog-header__search-reset"],
        textContent: "✖",
        eventType: "click",
        callback: () => {
          console.log("Reset search");
          this.searchInput.getHTMLElement().value = "";
          this.handleSearch();
        },
      }),
      this.searchInput,
      new CreateElement({
        tag: "button",
        cssClasses: ["catalog-header__search-submit"],
        textContent: "Search",
        eventType: "click",
        callback: this.handleSearch.bind(this),
      }),
    ],
  });

  private filterFoodInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["catalog-header__filter-input"],
    attributes: { type: "checkbox" },
    eventType: "change",
    callback: () => {
      this.filterCosmeticsInput.getHTMLElement().checked = false;
      this.handleFilters();
    },
  });

  private filterFood = new CreateElement({
    tag: "label",
    cssClasses: ["catalog-header__filter-label"],
    textContent: "Only food",
    children: [this.filterFoodInput],
  });

  private filterCosmeticsInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["catalog-header__filter-input"],
    attributes: { type: "checkbox" },
    eventType: "change",
    callback: () => {
      this.filterFoodInput.getHTMLElement().checked = false;
      this.handleFilters();
    },
  });

  private filterCosmetics = new CreateElement({
    tag: "label",
    cssClasses: ["catalog-header__filter-label"],
    textContent: "Only cosmetics",
    children: [this.filterCosmeticsInput],
  });

  private filter = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__filter"],
    children: [
      new CreateElement({
        tag: "button",
        cssClasses: ["catalog-header__filter-reset"],
        textContent: "✖",
        eventType: "click",
        callback: () => {
          this.filter
            .getHTMLElement()
            .querySelectorAll("input")
            .forEach((input) => {
              // eslint-disable-next-line no-param-reassign
              input.value = "";
            });
          this.filterFoodInput.getHTMLElement().checked = false;
          this.filterCosmeticsInput.getHTMLElement().checked = false;
          this.handleFilters();
        },
      }),
      new CreateElement({ tag: "span", textContent: "Filters: " }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__filter-label"],
        textContent: "Price(EUR) from:",
        children: [
          new CreateElement<HTMLInputElement>({
            tag: "input",
            cssClasses: ["catalog-header__filter-input"],
            attributes: { type: "number", placeholder: "0" },
            eventType: "keyup",
            callback: (event) => {
              if ((event as KeyboardEvent).key === "Enter") {
                this.handleFilters();
              }
            },
          }),
        ],
      }),
      new CreateElement({
        tag: "label",
        cssClasses: ["catalog-header__filter-label"],
        textContent: "to:",
        children: [
          new CreateElement<HTMLInputElement>({
            tag: "input",
            cssClasses: ["catalog-header__filter-input"],
            attributes: { type: "number", placeholder: "100" },
            eventType: "keyup",
            callback: (event) => {
              if ((event as KeyboardEvent).key === "Enter") {
                this.handleFilters();
              }
            },
          }),
        ],
      }),
      this.filterFood,
      this.filterCosmetics,
      new CreateElement({
        tag: "button",
        cssClasses: ["catalog-header__filter-button"],
        textContent: "Apply",
        eventType: "click",
        callback: this.handleFilters.bind(this),
      }),
    ],
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["catalog-header__content"],
    children: [
      new CreateElement({
        tag: "div",
        cssClasses: ["flex-row-wrap"],
        children: [this.breadcrumbs, this.availableCategories],
      }),
      new CreateElement({
        tag: "div",
        cssClasses: ["flex-row-wrap"],
        children: [this.sort, this.search, this.filter],
      }),
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
      searchParams?.get("sort-price") || "default";
    this.sortNameSelect.getHTMLElement().value =
      searchParams?.get("sort-name") || "default";

    this.searchInput.getHTMLElement().value = searchParams?.get("text") || "";

    this.filter.getHTMLElement().querySelectorAll("input")[0].value =
      (Number(searchParams?.get("price")?.split(" to ")[0]) / 100).toString() ||
      "";
    this.filter.getHTMLElement().querySelectorAll("input")[1].value =
      (Number(searchParams?.get("price")?.split(" to ")[1]) / 100).toString() ||
      "";

    if (searchParams?.get("food") === "true") {
      this.filterFoodInput.getHTMLElement().checked = true;
    }

    if (searchParams?.get("cosmetics") === "true") {
      this.filterCosmeticsInput.getHTMLElement().checked = true;
    }
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
    this.breadcrumbs.addInnerElements([
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
    ]);
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

  private handleSearch() {
    const searchParams = new URLSearchParams(
      window.location.hash.split("?")[1] || "",
    );
    if (!this.searchInput.getHTMLElement().value) {
      searchParams.delete("text");
    } else {
      searchParams.set("text", this.searchInput.getHTMLElement().value);
    }
    window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
  }

  private handleFilters() {
    const searchParams = new URLSearchParams(
      window.location.hash.split("?")[1] || "",
    );

    const from =
      Number(this.filter.getHTMLElement().querySelectorAll("input")[0].value) *
      100;
    const to =
      Number(this.filter.getHTMLElement().querySelectorAll("input")[1].value) *
      100;
    if (!from && !to) {
      searchParams.delete("price");
    } else {
      searchParams.set("price", `${from || 0} to ${to || "*"}`);
    }

    const isFood = this.filterFoodInput.getHTMLElement().checked;
    if (isFood) {
      searchParams.set("food", "true");
    } else {
      searchParams.delete("food");
    }

    const isCosmetics = this.filterCosmeticsInput.getHTMLElement().checked;
    if (isCosmetics) {
      searchParams.set("cosmetics", "true");
    } else {
      searchParams.delete("cosmetics");
    }

    window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
  }

  private handleSort(event: Event, sortType: "sort-price" | "sort-name") {
    const searchParams = new URLSearchParams(
      window.location.hash.split("?")[1] || "",
    );
    const select = event.target as HTMLSelectElement;
    const { value } = select.options[select.selectedIndex];
    if (value === "default") {
      searchParams.delete(sortType);
    } else {
      searchParams.set(sortType, value);
    }
    window.location.hash = `${window.location.hash.split("?")[0]}?${searchParams.toString()}`;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
