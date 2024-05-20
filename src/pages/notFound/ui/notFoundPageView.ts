import "./notFoundPage.scss";
import pageNotFoundImg from "../../../assets/images/page404.png";

import CreateElement from "../../../shared/helpers/element-create";
import Hash from "../../../shared/routs/enumHash";

class NotFoundPageView {
  private title = new CreateElement({
    tag: "h1",
    cssClasses: ["not-found-page__title"],
    textContent: "404 Page not found :(",
  });

  private image = new CreateElement({
    tag: "img",
    cssClasses: ["not-found-page__image"],
    attributes: {
      src: pageNotFoundImg,
      alt: "Not found",
    },
  });

  private additionalInfo = new CreateElement({
    tag: "p",
    cssClasses: ["not-found-page__additional-info"],
    textContent:
      "Damn it, stay calm, it's okay. Just go back to the main page or use the heading navigation.",
  });

  private buttonToMainPage = new CreateElement({
    tag: "a",
    cssClasses: ["not-found-page__button"],
    textContent: "Go to main page",
    attributes: { href: Hash.MAIN },
  });

  private container = new CreateElement({
    tag: "main",
    cssClasses: ["not-found-page"],
    children: [
      this.title,
      this.image,
      this.additionalInfo,
      this.buttonToMainPage,
    ],
  });

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new NotFoundPageView().getHTMLElement();
