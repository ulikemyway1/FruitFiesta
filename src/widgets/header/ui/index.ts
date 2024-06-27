import "./index.scss";
import logoIcon from "../../../assets/images/logo.svg";
import CreateElement from "../../../shared/helpers/element-create";
import Hash from "../../../shared/routs/enumHash";
import user from "../../../entities/user";
import userProfileAddresses from "../../../features/user-profile/user-address";
import tokenStorage from "../../../shared/state/model/tokenStorage";

class Header {
  private title = new CreateElement<HTMLDivElement>({
    tag: "a",
    cssClasses: ["header__title"],
    attributes: {
      href: Hash.MAIN,
    },
    textContent: "Fruit Fiesta",
  });

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

  private homeLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["nav__link"],
    attributes: { href: "#main" },
    textContent: "Home",
    eventType: "click",
    callback: this.closeBurger.bind(this),
  }).getHTMLElement();

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
    eventType: "click",
    callback: this.closeBurger.bind(this),
  }).getHTMLElement();

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
    eventType: "click",
    callback: this.closeBurger.bind(this),
  }).getHTMLElement();

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
  }).getHTMLElement();

  private burgerLines = new CreateElement<HTMLSpanElement>({
    tag: "span",
    cssClasses: ["header__burger-lines"],
  }).getHTMLElement();

  private burger = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__burger"],
    children: [this.burgerLines],
    eventType: "click",
    callback: this.toggleBurger.bind(this),
  }).getHTMLElement();

  private keyIcon = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__icon-key"],
    attributes: { title: "Register or Login" },
    eventType: "click",
    callback: this.toggleKeyIconPopUp.bind(this),
  }).getHTMLElement();

  private profileIcon = new CreateElement<HTMLImageElement>({
    tag: "div",
    cssClasses: ["header__icon-profile"],
    attributes: { title: "Profile or Logout" },
    eventType: "click",
    callback: this.toggleKeyIconPopUp.bind(this),
  }).getHTMLElement();

  productCountInCart = new CreateElement<HTMLSpanElement>({
    tag: "span",
    cssClasses: ["header__product-count-cart"],
    textContent: "0",
  });

  private cartIcon = new CreateElement<HTMLImageElement>({
    tag: "a",
    cssClasses: ["header__icon-cart"],
    attributes: { title: "Cart", href: "#basket" },
    children: [this.productCountInCart],
  });

  private registerLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#registration" },
    textContent: "Register",
    eventType: "click",
    callback: this.closeKeyIconPopUp.bind(this),
  }).getHTMLElement();

  private loginLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#login" },
    textContent: "Log in",
    eventType: "click",
    callback: this.closeKeyIconPopUp.bind(this),
  }).getHTMLElement();

  private logoutLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#logout" },
    textContent: "Logout",
    eventType: "click",
    callback: this.closeKeyIconPopUp.bind(this),
  }).getHTMLElement();

  private profileLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["header__link"],
    attributes: { href: "#profile" },
    textContent: "Profile",
    eventType: "click",
    callback: this.closeKeyIconPopUp.bind(this),
  }).getHTMLElement();

  private keyIconPopUp = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["header__icons-key-popup"],
    children: [
      this.registerLink,
      this.loginLink,
      this.profileLink,
      this.logoutLink,
    ],
  }).getHTMLElement();

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
    children: [
      this.logo,
      this.title,
      this.nav,
      this.userIconsWrapper,
      this.burger,
    ],
  });

  private container = new CreateElement({
    tag: "header",
    cssClasses: ["header"],
    children: [this.content],
  });

  constructor() {
    document.addEventListener("click", (event) => {
      const target = <HTMLElement>event.target;
      if (user.userIsLoggedIn) {
        if (!target.classList.contains("header__icon-profile")) {
          this.closeKeyIconPopUp();
        }
      }
      if (!user.userIsLoggedIn) {
        if (!target.classList.contains("header__icon-key")) {
          this.closeKeyIconPopUp();
        }
      }
      if (
        !target.classList.contains("header__burger-lines") &&
        !target.classList.contains("header__burger")
      ) {
        this.closeBurger();
      }
    });

    this.logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      userProfileAddresses.removeAll();

      localStorage.setItem("LoggedIn", JSON.stringify(false));
      tokenStorage.clear();
      user.userInfo = null;
      user.userIsLoggedIn = false;

      window.location.hash = Hash.LOGIN;
      this.closeKeyIconPopUp();
    });

    setTimeout(() => {
      this.update();
    }, 0);
  }

  public toggleActiveLink() {
    const { hash } = document.location;
    Array.from(this.navList.getHTMLElement().children).forEach((link) => {
      link.classList.remove("nav__item_active");
      if (hash.startsWith(link.firstElementChild?.getAttribute("href") || "")) {
        link.classList.add("nav__item_active");
      }
    });
  }

  public update() {
    if (user.userIsLoggedIn) {
      this.loginLink.classList.add("nav__item_hidden");
      this.registerLink.classList.add("nav__item_hidden");
      this.profileIcon.classList.remove("nav__item_hidden");
      this.profileLink.classList.remove("nav__item_hidden");
      this.keyIcon.classList.add("nav__item_hidden");
      this.logoutLink.classList.remove("nav__item_hidden");
    } else {
      this.loginLink.classList.remove("nav__item_hidden");
      this.keyIcon.classList.remove("nav__item_hidden");
      this.registerLink.classList.remove("nav__item_hidden");
      this.profileLink.classList.add("nav__item_hidden");
      this.logoutLink.classList.add("nav__item_hidden");
      this.profileIcon.classList.add("nav__item_hidden");
    }
  }

  updateFromCart(count: number) {
    this.productCountInCart.getHTMLElement().textContent = count.toString();
  }

  toggleKeyIconPopUp() {
    if (user.userIsLoggedIn) {
      this.profileIcon.classList.toggle("active");
      this.keyIconPopUp.classList.toggle("active");
    } else {
      this.keyIcon.classList.toggle("active");
      this.keyIconPopUp.classList.toggle("active");
    }
  }

  closeKeyIconPopUp() {
    this.keyIconPopUp.classList.remove("active");
    this.keyIcon.classList.remove("active");
  }

  toggleBurger() {
    this.nav.classList.toggle("active");
    this.burgerLines.classList.toggle("active");
    this.burger.classList.toggle("active");
  }

  closeBurger() {
    this.nav.classList.remove("active");
    this.burgerLines.classList.remove("active");
    this.burger.classList.remove("active");
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}

export default new Header();
