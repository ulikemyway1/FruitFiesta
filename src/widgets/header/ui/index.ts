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

  private navItems: CreateElement<HTMLElement>[] = [];

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

      this.navItems.push(navItem);
    });

    this.navList.addInnerElements(this.navItems);
    this.nav.addInnerElements(this.navList);
    this.container.addInnerElements([this.logo, this.title, this.nav]);
  }

  public toggleActiveLink() {
    const { hash } = document.location;
    this.navItems.forEach((navItem) => {
      navItem.getHTMLElement().classList.remove("nav__item_active");
      if (
        navItem.getHTMLElement().firstElementChild?.getAttribute("href") ===
        hash
      ) {
        navItem.getHTMLElement().classList.add("nav__item_active");
      }
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header();
