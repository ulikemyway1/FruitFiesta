import { Category } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import { fetchCategories } from "../api";
import Hash from "../../../shared/routs/enumHash";

export default class CategoriesBlockView {
  private categories: Category[] = [];

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["categories-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["categories-block"],
    children: [this.content],
  });

  constructor(categories: Category[], path?: string[]) {
    // const pathArray = path?.split("/");

    console.log(path);

    // this.getCategories().then((categories) => {
    //   console.log(categories);
    this.categories = categories;

    // const mainCategory = categories.filter(
    //   (category) => category.ancestors.length === 0,
    // );
    categories.forEach((category) => {
      this.content.addInnerElements(
        new CreateElement({
          tag: "button",
          cssClasses: ["category-button"],
          textContent: category.name["en-GB"],
          eventType: "click",
          callback: () => {
            console.log(category.id);
            if (category.ancestors.length) {
              // window.location.hash = `${Hash.CATALOG}/${category.ancestors[0].id}/${category.id}`;
              window.location.hash = `${Hash.CATALOG}/${this.getCategorySlugById(this.getAncestorId(category))}/${category.slug["en-GB"]}`;
            } else {
              // window.location.hash = `${Hash.CATALOG}/${category.id}`;
              window.location.hash = `${Hash.CATALOG}/${category.slug["en-GB"]}`;
            }
          },
        }).getHTMLElement(),
      );
    });
    // });
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

  private getAncestorId(category: Category) {
    return category.ancestors[0].id;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
