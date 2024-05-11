import "./index.scss";

import CreateElement from "../../../shared/helpers/element-create";
import PAGES from "./PAGES";

class Header {
  private container = new CreateElement({
    tag: "header",
    cssClasses: ["header"],
  });

  private nav = new CreateElement({
    tag: "nav",
    cssClasses: ["nav"],
  });

  private navList = new CreateElement({
    tag: "ul",
    cssClasses: ["nav__list"],
  });

  constructor() {
    PAGES.forEach((href, textContent) => {
      const navItem = new CreateElement({
        tag: "li",
        cssClasses: ["nav__item"],
        children: [
          new CreateElement({
            tag: "a",
            cssClasses: ["nav__link"],
            textContent,
            attributes: {
              href,
            },
          }),
        ],
      });

      this.navList.addInnerElements(navItem);
    });

    this.nav.addInnerElements(this.navList);
    this.container.addInnerElements(this.nav);
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header().getHTMLElement();
