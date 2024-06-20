import CreateElement from "../../../shared/helpers/element-create";
import Hash from "../../../shared/routs/enumHash";
import "./hero-block.scss";

export default class HeroView {
  private title = new CreateElement<HTMLHeadingElement>({
    tag: "h1",
    cssClasses: ["hero__title"],
    textContent: "Fresh Arrivals Online",
  }).getHTMLElement();

  private toCatalogButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["hero__button"],
    textContent: "View catalog",
    eventType: "click",
    callback: this.handleToCatalogButton.bind(this),
  }).getHTMLElement();

  private content = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["hero__content"],
    children: [this.title, this.toCatalogButton],
  }).getHTMLElement();

  private container = new CreateElement({
    tag: "section",
    cssClasses: ["hero"],
  }).getHTMLElement();

  constructor() {
    this.container.append(this.content);
  }

  private handleToCatalogButton() {
    window.location.href = Hash.CATALOG;
  }

  getHTMLElement(): HTMLElement {
    return this.container;
  }
}
