import "./mainPage.scss";
import CreateElement from "../../../shared/helpers/element-create";
import cleanContainer from "../../../shared/utils/clean-container";

export default class MainPageView {
  private container = new CreateElement({
    tag: "main",
    cssClasses: ["main-page"],
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
