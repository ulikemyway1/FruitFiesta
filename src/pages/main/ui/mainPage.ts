import Hash from "../../../app/routing/model/enumHash";
import CreateElement from "../../../shared/helpers/element-create";

import apiRoot from "../../../shared/api/APIRoot";

// get discount code list
const getProductDiscounts = () => apiRoot.discountCodes().get().execute();

export default class MainPageMain {
  title = new CreateElement({
    tag: "h1",
    cssClasses: ["main-page__title"],
    textContent: "Main page",
  });

  content = new CreateElement({
    tag: "div",
    cssClasses: ["main-page__content"],
    textContent: "Ut et sint non aliqua ex id sit labore eiusmod laboris.",
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
    tag: "main",
    cssClasses: ["main-page"],
    children: [this.title, this.content, this.button],
  });

  constructor() {
    getProductDiscounts().then((response) => {
      console.log(response);
      this.content.getHTMLElement().textContent = `Джесон дисконтов: ${JSON.stringify(response)}`;
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
