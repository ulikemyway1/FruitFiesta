import CreateElement from "../../../shared/helpers/element-create";
import fetchCategories from "./api";

export default class CategoriesBlockView {
  private content = new CreateElement({
    tag: "div",
    cssClasses: ["categories-block__content"],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["categories-block"],
    children: [this.content],
  });

  constructor() {
    this.getCategories().then((categories) => {
      categories.forEach((category) => {
        this.content.addInnerElements(
          //   new CategoryButtonView(category).getHTMLElement(),
          new CreateElement({
            tag: "button",
            cssClasses: ["category-button"],
            textContent: category.name["en-GB"],
            eventType: "click",
            callback: () => {
              console.log(category.id);
              window.location.hash = `#catalog/${category.id}`;
            },
          }).getHTMLElement(),
        );
      });
    });
  }

  async getCategories() {
    const response = await fetchCategories();
    return response.body.results;
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
