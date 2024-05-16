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

  private shippingAddress: HTMLElement = new CreateElement({
    tag: "div",
    cssClasses: ["user-profile__shipping-address"],
  }).getHTMLElement();

  constructor(username: string, shippingAddress: string) {
    this.greeting.textContent = `Hello, ${username}`;
    this.shippingAddress.textContent = shippingAddress;

    this.view.append(this.greeting, this.shippingAddress);
  }

  public getVeiw() {
    return this.view;
  }
}
