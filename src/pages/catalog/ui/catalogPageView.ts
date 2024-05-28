import "./catalogPage.scss";
import CreateElement from "../../../shared/helpers/element-create";
import cleanContainer from "../../../shared/utils/clean-container";

export default class CatalogPageView {
  private container = new CreateElement({
    tag: "main",
    cssClasses: ["catalog-page"],
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
