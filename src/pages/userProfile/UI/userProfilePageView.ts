import CreateElement from "../../../shared/helpers/element-create";

export class UserProfileView {
  private view: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["user-profile"],
  }).getHTMLElement();

  public title: HTMLElement = new CreateElement({
    tag: "h2",
    cssClasses: ["user-profile__title"],
    textContent: "USER PROFILE",
  }).getHTMLElement();

  public main: HTMLElement = new CreateElement({
    tag: "div",
    cssClasses: ["user-profile__main"],
  }).getHTMLElement();

  constructor() {
    this.view.append(this.title, this.main);
  }

  public getView(): HTMLElement {
    return this.view;
  }
}

const userProfileView = new UserProfileView();

export default userProfileView;
