import "./index.scss";
import logoIcon from "../../../assets/images/logo.svg";

import CreateElement from "../../../shared/helpers/element-create";
import HEADER_LINKS from "./HEADER_LINKS";
import Hash from "../../../shared/routs/enumHash";
// eslint-disable-next-line import/no-cycle
import appController from "../../../app/app/appController";

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
          src: logoIcon,
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
    cssClasses: ["navigation"],
  });

  private navList = new CreateElement({
    tag: "ul",
    cssClasses: ["nav"],
  });

  private navItems: CreateElement<HTMLElement>[] = [];

  constructor() {
    HEADER_LINKS.forEach(([textContent, href, icon]) => {
      const navItem = new CreateElement({
        tag: "li",
        cssClasses: ["nav__item"],
        children: [
          new CreateElement({
            tag: "a",
            cssClasses: ["nav__link"],
            attributes: {
              href,
            },
            // eventType: "click",
            // callback: () => {
            //   appController.model.userIsLoggedIn = false;
            // },
            children: [
              new CreateElement({
                tag: "img",
                cssClasses: ["nav__icon"],
                attributes: {
                  src: icon,
                  alt: textContent,
                },
              }),
              new CreateElement({
                tag: "div",
                cssClasses: ["nav__text"],
                textContent,
              }),
            ],
          }),
        ],
      });

      this.navItems.push(navItem);
    });

    this.navItems[7].getHTMLElement().addEventListener("click", () => {
      appController.model.userIsLoggedIn = false;
      localStorage.removeItem("auth-token");
    });

    setTimeout(() => {
      this.update();
    }, 0);

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

  public update() {
    console.log("Header was updated");
    if (appController.model.userIsLoggedIn) {
      this.navItems[4].getHTMLElement().classList.add("nav__item_hidden");
      this.navItems[5].getHTMLElement().classList.add("nav__item_hidden");
      this.navItems[6].getHTMLElement().classList.remove("nav__item_hidden");
      this.navItems[7].getHTMLElement().classList.remove("nav__item_hidden");
    } else {
      this.navItems[4].getHTMLElement().classList.remove("nav__item_hidden");
      this.navItems[5].getHTMLElement().classList.remove("nav__item_hidden");
      this.navItems[6].getHTMLElement().classList.add("nav__item_hidden");
      this.navItems[7].getHTMLElement().classList.add("nav__item_hidden");
    }
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header();
