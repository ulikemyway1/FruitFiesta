import Hash from "../../../app/routing/model/enumHash";
import CreateElement from "../../../shared/helpers/element-create";

export default class MainPageView {
  title = new CreateElement({
    tag: "h1",
    cssClasses: ["main-page__title"],
    textContent: "Main page",
  });

  content = new CreateElement({
    tag: "div",
    cssClasses: ["main-page__content"],
    textContent: "Content",
  });

  button = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["main-page__button"],
    textContent: "Go to login page",
    eventType: "click",
    callback: () => {
      window.location.hash = Hash.LOGIN;
    },
  });

  container = new CreateElement({
    tag: "div",
    cssClasses: ["main-page"],
    children: [this.title, this.content, this.button],
  });

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
