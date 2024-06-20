import { contributorsData } from "../../../shared/contributorsData/contributorsData";
import CreateElement from "../../../shared/helpers/element-create";
import "./footer.scss";

export class Footer {
  private rights = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["footer__rights"],
    textContent: "2024",
  }).getHTMLElement();

  private image = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["footer__image-rss"],
    attributes: {
      src: contributorsData.teacherLogo,
    },
  }).getHTMLElement();

  private link = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["footer__link"],
    attributes: {
      href: contributorsData.teacherCourseLink,
    },
    children: [this.image],
  }).getHTMLElement();

  private linksWrapper = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__links-wrapper"],
    children: [this.link, this.rights],
  }).getHTMLElement();

  private developerWrapper = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__icon-wrapper"],
  }).getHTMLElement();

  private line = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["footer__line"],
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
    children: [this.title, this.text, this.line, this.linksWrapper],
  }).getHTMLElement();

  private container = new CreateElement<HTMLElement>({
    tag: "footer",
    cssClasses: ["footer"],
  }).getHTMLElement();

  constructor() {
    contributorsData.teamContent.forEach((developer) => {
      const image = new CreateElement<HTMLImageElement>({
        tag: "img",
        cssClasses: ["footer__image"],
        attributes: {
          src: developer.gitIcon,
        },
      }).getHTMLElement();

      const link = new CreateElement<HTMLLinkElement>({
        tag: "a",
        cssClasses: ["footer__link"],
        attributes: {
          href: developer.link,
        },
        children: [image],
      }).getHTMLElement();

      this.developerWrapper.append(link);
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
