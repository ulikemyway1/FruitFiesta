import CreateElement from "../../../shared/helpers/element-create";
import aboutData from "./aboutData";
import "./about.scss";

export class About {
  private teacherImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["about__teacher-image"],
    attributes: { src: aboutData.teacherLogo },
  }).getHTMLElement();

  private teacherLink = new CreateElement<HTMLLinkElement>({
    tag: "a",
    cssClasses: ["about__teacher-link"],
    attributes: {
      href: "https://rs.school/courses",
    },
    children: [this.teacherImage],
  }).getHTMLElement();

  private teacherInner = new CreateElement<HTMLElement>({
    tag: "div",
    cssClasses: ["about__block-inner"],
    children: [this.teacherLink],
  }).getHTMLElement();

  private teacherSection = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["about__block"],
    children: [this.teacherInner],
  }).getHTMLElement();

  private mentorText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["about__mentor-text"],
    textContent: aboutData.mentorText,
  }).getHTMLElement();

  private mentorTitle = new CreateElement<HTMLParagraphElement>({
    tag: "h3",
    cssClasses: ["about__mentor-title"],
    textContent: aboutData.mentorTitle,
  }).getHTMLElement();

  private mentorInner = new CreateElement<HTMLElement>({
    tag: "div",
    cssClasses: ["about__mentor-inner"],
    children: [this.mentorTitle, this.mentorText],
  }).getHTMLElement();

  private mentorSection = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["about__block"],
    children: [this.mentorInner],
  }).getHTMLElement();

  private contributionText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["about__text"],
    textContent: aboutData.contributionText,
  }).getHTMLElement();

  private contributionTitle = new CreateElement<HTMLHeadingElement>({
    tag: "h3",
    cssClasses: ["about__title"],
    textContent: aboutData.contributionTitle,
  }).getHTMLElement();

  private contributionInner = new CreateElement<HTMLElement>({
    tag: "div",
    cssClasses: ["about__block-inner"],
    children: [this.contributionTitle, this.contributionText],
  }).getHTMLElement();

  private contributionSection = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["about__block"],
    children: [this.contributionInner],
  }).getHTMLElement();

  private teamTitle = new CreateElement<HTMLHeadingElement>({
    tag: "h3",
    cssClasses: ["about__title"],
    textContent: aboutData.teamTitle,
  }).getHTMLElement();

  private teamInner = new CreateElement<HTMLElement>({
    tag: "div",
    cssClasses: ["about__block-inner"],
    children: [this.teamTitle],
  }).getHTMLElement();

  private teamSection = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["about__block"],
    children: [this.teamInner],
  }).getHTMLElement();

  private projectTitle = new CreateElement<HTMLParagraphElement>({
    tag: "h3",
    cssClasses: ["project-title"],
    textContent: aboutData.projectTitle,
  }).getHTMLElement();

  private projectInner = new CreateElement<HTMLElement>({
    tag: "div",
    cssClasses: ["about__block-inner"],
    children: [this.projectTitle],
  }).getHTMLElement();

  private projectSection = new CreateElement<HTMLElement>({
    tag: "section",
    cssClasses: ["about__block"],
    children: [this.projectInner],
  }).getHTMLElement();

  private main = new CreateElement<HTMLElement>({
    tag: "main",
    cssClasses: ["about"],
  }).getHTMLElement();

  constructor() {
    aboutData.teamContent.forEach((data) => {
      const image = new CreateElement<HTMLImageElement>({
        tag: "img",
        cssClasses: ["about__team-image"],
        attributes: { src: data.img },
      }).getHTMLElement();

      const title = new CreateElement<HTMLHeadingElement>({
        tag: "h4",
        cssClasses: ["about__team-title"],
        textContent: data.name,
      }).getHTMLElement();

      const position = new CreateElement<HTMLHeadingElement>({
        tag: "h6",
        cssClasses: ["about__team-position"],
        textContent: data.position,
      }).getHTMLElement();

      const text = new CreateElement<HTMLParagraphElement>({
        tag: "p",
        cssClasses: ["about__team-text"],
        textContent: data.text,
      }).getHTMLElement();

      const link = new CreateElement<HTMLLinkElement>({
        tag: "a",
        cssClasses: ["about__team-link"],
        attributes: { href: data.link },
        textContent: "GitHub profile",
      }).getHTMLElement();

      const box = new CreateElement<HTMLElement>({
        tag: "article",
        cssClasses: ["about__team-box"],
        children: [title, position, text, link],
      }).getHTMLElement();

      const container = new CreateElement<HTMLElement>({
        tag: "article",
        cssClasses: ["about__team-container"],
        children: [image, box],
      }).getHTMLElement();

      this.teamInner.append(container);
    });

    this.main.append(
      this.projectSection,
      this.teamSection,
      this.contributionSection,
      this.mentorSection,
      this.teacherSection
    );
  }

  getHTMLElement(): HTMLElement {
    return this.main;
  }
}

export default new About();
