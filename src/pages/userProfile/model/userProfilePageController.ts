import userProfileController from "../../../features/user-profile";
import userProfileView, { UserProfileView } from "../UI/userProfilePageView";

export class UserProfileController {
  private view: UserProfileView;

  constructor(view: UserProfileView) {
    this.view = view;
    this.view.getView().append(userProfileController.getView()!);
  }

  public getView(): HTMLElement {
    return this.view.getView();
  }
}

const userProfilePageController = new UserProfileController(userProfileView);

export default userProfilePageController;
