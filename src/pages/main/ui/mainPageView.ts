import "./mainPage.scss";
import CreateElement from "../../../shared/helpers/element-create";
import cleanContainer from "../../../shared/utils/clean-container";

export default class MainPageView {
  // private title = new CreateElement({
  //   tag: "h1",
  //   cssClasses: ["main-page__title"],
  //   textContent: "Main page",
  // });

  // private content = new CreateElement({
  //   tag: "div",
  //   cssClasses: ["main-page__content"],
  //   textContent: "Maybe some text on main page.",
  // });

  private container = new CreateElement({
    tag: "main",
    cssClasses: ["main-page"],
    // children: [this.content],
  });

  appendContent(...contents: HTMLElement[]) {
    this.container.addInnerElements(contents);
  }

  setContent(...contents: HTMLElement[]) {
    cleanContainer(this.container.getHTMLElement());
    this.appendContent(...contents);
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
