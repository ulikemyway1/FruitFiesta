import CreateElement from "../../../shared/helpers/element-create";
import Hash from "../../../shared/routs/enumHash";
import "./category-block.scss";
import data from "./categoryData";

export default class CategoryView {
  private title = new CreateElement<HTMLHeadingElement>({
    tag: "h2",
    cssClasses: ["category__title"],
    textContent: "Our Categories",
  }).getHTMLElement();

  private content = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["category__content"],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "section",
    cssClasses: ["category"],
  }).getHTMLElement();

  constructor() {
    this.content.append(this.title);

    data.categoryData.forEach((value) => {
      const image = new CreateElement<HTMLImageElement>({
        tag: "img",
        cssClasses: ["category__image"],
        attributes: { src: value.src },
      }).getHTMLElement();

      const text = new CreateElement<HTMLParagraphElement>({
        tag: "p",
        cssClasses: ["category__text"],
        textContent: value.text,
      }).getHTMLElement();

      const button = new CreateElement<HTMLButtonElement>({
        tag: "button",
        cssClasses: ["category__button"],
        textContent: "SHOW",
        eventType: "click",
        callback: this.handleToCatalogButton.bind(this),
      }).getHTMLElement();

      const title = new CreateElement<HTMLHeadingElement>({
        tag: "h3",
        cssClasses: ["category__sub-title"],
        textContent: value.title,
      }).getHTMLElement();

      const container = new CreateElement<HTMLDivElement>({
        tag: "div",
        cssClasses: ["category__container"],
        children: [title, text, button],
      }).getHTMLElement();

      const wrapper = new CreateElement<HTMLElement>({
        tag: "article",
        cssClasses: ["category__sub-block"],
        children: [image, container],
      }).getHTMLElement();

      this.content.append(wrapper);
    });

    this.container.append(this.content);
  }

  private handleToCatalogButton() {
    window.location.href = Hash.CATALOG;
  }

  getHTMLElement(): HTMLElement {
    return this.container;
  }
}
