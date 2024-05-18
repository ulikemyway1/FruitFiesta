import "./index.scss";
import logoIcon from "../../../assets/images/logo.svg";
import loginIcon from "../../../assets/images/log-in-svgrepo-com.svg";
import cartIcon from "../../../assets/images/cart-icon.svg";
import profileIcon from "../../../assets/images/user-profile-svgrepo-com.svg";

import CreateElement from "../../../shared/helpers/element-create";
// import HEADER_LINKS from "./HEADER_LINKS";
import Hash from "../../../shared/routs/enumHash";

import user from "../../../entities/user";

class Header {
  private logo = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__logo"],
    attributes: {
      href: Hash.MAIN,
    },
    children: [
      new CreateElement<HTMLImageElement>({
        tag: "img",
        cssClasses: ["header__logo-img"],
        attributes: {
          src: logoIcon,
          alt: "Logo",
        },
      }),
    ],
  });

  private title = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__title"],
    textContent: "Fruit Fiesta",
  });

  // private navItems: CreateElement<HTMLElement>[] = [];

  private homeLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["nav__link"],
    attributes: { href: "#main" },
    textContent: "Home",
  });

  private homeLi = new CreateElement<HTMLLIElement>({
    tag: "li",
    cssClasses: ["nav__item"],
    children: [this.homeLink],
  });

  private catalogLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["nav__link"],
    attributes: { href: "#catalog" },
    textContent: "Catalog",
  });

  private catalogLi = new CreateElement<HTMLLIElement>({
    tag: "li",
    cssClasses: ["nav__item"],
    children: [this.catalogLink],
  });

  private aboutLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["nav__link"],
    attributes: { href: "#about" },
    textContent: "About",
  });

  private aboutLi = new CreateElement<HTMLLIElement>({
    tag: "li",
    cssClasses: ["nav__item"],
    children: [this.aboutLink],
  });

  private navList = new CreateElement<HTMLUListElement>({
    tag: "ul",
    cssClasses: ["nav"],
    children: [this.homeLi, this.catalogLi, this.aboutLi],
  });

  private nav = new CreateElement<HTMLElement>({
    tag: "nav",
    cssClasses: ["navigation"],
    children: [this.navList],
  });

  private keyIcon = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["header__icon-key"],
    attributes: {
      src: loginIcon,
      alt: "key-logo",
    },
  });

  private profileIcon = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["header__icon-profile"],
    attributes: {
      src: profileIcon,
      alt: "key-logo",
    },
  });

  private cartIcon = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["header__icon-cart"],
    attributes: {
      src: cartIcon,
      alt: "cart-logo",
    },
  });

  private registerLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#registration" },
    textContent: "Register",
  });

  private loginLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#login" },
    textContent: "Log in",
  });

  private logoutLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#logout" },
    textContent: "Log out",
  });

  private profileLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#profile" },
    textContent: "Profile",
  });

  private keyIconPopUp = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__icons-key-popup"],
    children: [
      this.registerLink,
      this.loginLink,
      this.profileLink,
      this.logoutLink,
    ],
  });

  private userIconsWrapper = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__icons-wrapper"],
    children: [
      this.keyIcon,
      this.profileIcon,
      this.cartIcon,
      this.keyIconPopUp,
    ],
  });

  private content = new CreateElement({
    tag: "article",
    cssClasses: ["header__content"],
    children: [this.logo, this.title, this.nav, this.userIconsWrapper],
  });

  private container = new CreateElement({
    tag: "header",
    cssClasses: ["header"],
    children: [this.content],
  });

  constructor() {
    this.logoutLink.getHTMLElement().addEventListener("click", (event) => {
      event.preventDefault();
      user.userIsLoggedIn = false;
      localStorage.removeItem("auth-token");
      window.location.hash = Hash.LOGIN;
    });

    setTimeout(() => {
      this.update();
    }, 0);
  }

  public toggleActiveLink() {
    const { hash } = document.location;
    Array.from(this.navList.getHTMLElement().children).forEach((link) => {
      link.classList.remove("nav__item_active");
      if (link.firstElementChild?.getAttribute("href") === hash) {
        link.classList.add("nav__item_active");
      }
    });
  }

  public update() {
    if (user.userIsLoggedIn) {
      this.loginLink.getHTMLElement().classList.add("nav__item_hidden");
      this.registerLink.getHTMLElement().classList.add("nav__item_hidden");
      this.profileLink.getHTMLElement().classList.remove("nav__item_hidden");
      this.loginLink.getHTMLElement().classList.remove("nav__item_hidden");
    } else {
      this.loginLink.getHTMLElement().classList.remove("nav__item_hidden");
      this.registerLink.getHTMLElement().classList.remove("nav__item_hidden");
      this.profileLink.getHTMLElement().classList.add("nav__item_hidden");
      this.logoutLink.getHTMLElement().classList.add("nav__item_hidden");
    }
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header();
