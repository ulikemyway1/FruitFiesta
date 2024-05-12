import "./index.scss";
import logo from "../../../assets/images/logo.svg";

import CreateElement from "../../../shared/helpers/element-create";
import PAGES from "./PAGES";
import Hash from "../../../app/routing/model/enumHash";

class Header {
  private container = new CreateElement({
    tag: "header",
    cssClasses: ["header"],
  });

  private logo = new CreateElement({
    tag: "a",
    cssClasses: ["header__logo"],
    attributes: {
      href: Hash.MAIN,
    },
    children: [
      new CreateElement({
        tag: "img",
        cssClasses: ["header__logo-img"],
        attributes: {
          src: logo,
          alt: "Logo",
        },
      }),
    ],
  });

  private title = new CreateElement({
    tag: "div",
    cssClasses: ["header__title"],
    textContent: "Fruit Fiesta",
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
    this.container.addInnerElements([this.logo, this.title, this.nav]);
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header().getHTMLElement();
