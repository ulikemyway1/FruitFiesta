import userBasicProfile from "../../../features/user-profile/user-basic/model/userBasicProfileController";
import userShippingProfileController from "../../../features/user-profile/user-shipping-address";
import CreateElement from "../../../shared/helpers/element-create";
import userProfileView from "../UI/userProfilePageView";

export class UserProfileController {
  private view = userProfileView;

  constructor() {
    this.addSection(userBasicProfile.getView());
    this.addSection(this.createShippingAddressesBlock());
  }

  public getView(): HTMLElement {
    return this.view.getView();
  }

  private addSection(section: HTMLElement) {
    this.view.addSection(section);
  }

  private createShippingAddressesBlock(): HTMLElement {
    const block = new CreateElement({
      tag: "section",
      cssClasses: ["user-profile__shipping-addresses-block"],
      textContent: "Your shipping addresses",
    }).getHTMLElement();
    const wrapper = new CreateElement({
      tag: "div",
      cssClasses: ["user-profile__shipping-addresses-wrapper"],
    }).getHTMLElement();
    wrapper.append(userShippingProfileController.getView());
    block.append(wrapper);
    return block;
  }
}

const userProfilePage = new UserProfileController();
export default userProfilePage;
