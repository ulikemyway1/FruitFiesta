import userBasicProfile from "../../../features/user-profile/user-basic/model/userBasicProfileController";
import CreateElement from "../../../shared/helpers/element-create";
import userProfileView from "../UI/userProfilePageView";
import userProfileAddresses from "../../../features/user-profile/user-address";

export class UserProfileController {
  private view = userProfileView;

  constructor() {
    this.addSection(userBasicProfile.getView());
    this.addSection(this.createShippingAddressesBlock());
    this.addSection(this.createBillingAddressesBlock());
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
    wrapper.append(userProfileAddresses.getShippingView());
    block.append(wrapper);
    return block;
  }

  private createBillingAddressesBlock(): HTMLElement {
    const block = new CreateElement({
      tag: "section",
      cssClasses: ["user-profile__billing-addresses-block"],
      textContent: "Your billing addresses",
    }).getHTMLElement();
    const wrapper = new CreateElement({
      tag: "div",
      cssClasses: ["user-profile__billing-addresses-wrapper"],
    }).getHTMLElement();
    wrapper.append(userProfileAddresses.getBillingView());
    block.append(wrapper);
    return block;
  }
}

const userProfilePage = new UserProfileController();
export default userProfilePage;
