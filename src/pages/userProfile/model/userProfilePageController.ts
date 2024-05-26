import userBasicProfile from "../../../features/user-profile/user-basic/model/userBasicProfileController";
import userProfileView from "../UI/userProfilePageView";

export class UserProfileController {
  private view = userProfileView;

  constructor() {
    this.addSection(userBasicProfile.getView());
  }

  public getView(): HTMLElement {
    return this.view.getView();
  }

  private addSection(section: HTMLElement) {
    this.view.addSection(section);
  }
}

const userProfilePage = new UserProfileController();
export default userProfilePage;
