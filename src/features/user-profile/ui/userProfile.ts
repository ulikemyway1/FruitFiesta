import CreateElement from "../../../shared/helpers/element-create";
import "./userProfile.scss";

export default class UserProfileView {
  private view: HTMLElement = new CreateElement({
    tag: "article",
    cssClasses: ["user-profile"],
  }).getHTMLElement();

  private greeting: HTMLElement = new CreateElement({
    tag: "h2",
    cssClasses: ["user-profile__username"],
  }).getHTMLElement();

  private email: HTMLElement = new CreateElement({
    tag: "div",
    cssClasses: ["user-profile__email"],
  }).getHTMLElement();

  constructor() {
    this.view.append(this.greeting, this.email);
  }

  public setUsername(username: string) {
    this.greeting.textContent = `Hello, ${username}`;
  }

  public setEmail(email: string) {
    this.email.textContent = email;
  }

  public getVeiw() {
    return this.view;
  }
}
