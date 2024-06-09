import CreateElement from "../../../shared/helpers/element-create";
import data from "./footerData";
import rss from "../../../assets/images/rss.svg";
import "./footer.scss";

export class Footer {
  private rights = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["footer__text"],
    textContent: "© 2024 Fruit Fiesta. All Rights Reserved.",
  }).getHTMLElement();

  private image = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["footer__image"],
    attributes: {
      src: rss,
    },
  }).getHTMLElement();

  private linksWrapper = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__links-wrapper"],
    children: [this.image],
  }).getHTMLElement();

  private developerWrapper = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__icon-wrapper"],
  }).getHTMLElement();

  private line = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__line"],
  }).getHTMLElement();

  private buttonLeft = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["footer__button"],
    attributes: {
      href: "https://github.com/users/ulikemyway1/projects/2",
    },
    textContent: "Project GitHub",
  }).getHTMLElement();

  private buttonRight = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["footer__button"],
    attributes: {
      href: "https://rs.school/courses",
    },
    textContent: "Enroll the course",
  }).getHTMLElement();

  private buttonsWrapper = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["footer__buttons-wrapper"],
    children: [this.buttonLeft, this.buttonRight],
  }).getHTMLElement();

  private text = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["footer__text"],
    textContent:
      "The Fruit Fiesta Online Store thanks all participants of the Rolling Scopes School training course for opportunity to receive free up-to-date knowledge and practical skills close to real projects.",
  }).getHTMLElement();

  private title = new CreateElement<HTMLHeadingElement>({
    tag: "h3",
    cssClasses: ["footer__title"],
    textContent: "The Fruit Fiesta",
  }).getHTMLElement();

  private content = new CreateElement<HTMLElement>({
    tag: "article",
    cssClasses: ["footer__content"],
    children: [
      this.title,
      this.text,
      this.buttonsWrapper,
      this.line,
      this.linksWrapper,
    ],
  }).getHTMLElement();

  private container = new CreateElement<HTMLElement>({
    tag: "footer",
    cssClasses: ["footer"],
  }).getHTMLElement();

  constructor() {
    data.footerData.forEach((developer) => {
      const image = new CreateElement<HTMLImageElement>({
        tag: "img",
        cssClasses: ["footer__image"],
        attributes: {
          href: developer.link,
          src: developer.img,
        },
      }).getHTMLElement();

      this.developerWrapper.append(image);
    });
    this.linksWrapper.append(this.developerWrapper);
    this.content.append(this.linksWrapper);
    this.container.append(this.content);
  }

  getHTMLElement(): HTMLElement {
    return this.container;
  }
}

export default new Footer();
