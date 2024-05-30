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
    console.log("Path CategoriesBlockView: ", path);

    this.categories = categories;

    let categoriesToShow: Category[] = [];
    if (!path) {
      categoriesToShow = categories.filter(
        (category) => category.parent === undefined,
      );
    } else {
      const categoryId = this.getLastCategoryIdByPathSlug(path);
      categoriesToShow = categories.filter(
        (category) => category.parent?.id === categoryId,
      );
    }

    this.content.addInnerElements(
      new CreateElement({
        tag: "div",
        cssClasses: ["categories-block__breadcrumbs"],
        children: [
          new CreateElement({
            tag: "span",
            textContent: `root`,
          }).getHTMLElement(),
          ...(path?.map((item) =>
            new CreateElement({
              tag: "span",
              textContent: `/${item}`,
            }).getHTMLElement(),
          ) || []),
        ],
      }),
    );

    categoriesToShow.forEach((category) => {
      this.content.addInnerElements(
        new CreateElement({
          tag: "button",
          cssClasses: ["category-button"],
          textContent: category.name["en-GB"],
          eventType: "click",
          callback: () => {
            console.log(category.id);
            // if (category.ancestors.length) {
            //   // window.location.hash = `${Hash.CATALOG}/${category.ancestors[0].id}/${category.id}`;
            //   window.location.hash = `${Hash.CATALOG}/${this.getCategorySlugById(this.getAncestorId(category))}/${category.slug["en-GB"]}`;
            // } else {
            //   // window.location.hash = `${Hash.CATALOG}/${category.id}`;
            //   window.location.hash = `${Hash.CATALOG}/${category.slug["en-GB"]}`;
            // }

            const midPath = category.ancestors
              .map((ancestor) => this.getCategorySlugById(ancestor.id))
              .join("/");
            console.log("midPath: ", midPath);

            window.location.hash = `${Hash.CATALOG}/${midPath.length ? midPath.concat("/") : ""}${category.slug["en-GB"]}`;
          },
        }).getHTMLElement(),
      );
    });
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

  private getAncestorId(category: Category) {
    return category.ancestors[0].id;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
