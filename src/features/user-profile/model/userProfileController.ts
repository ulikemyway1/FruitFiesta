import requestAPI from "../../../shared/api/APIRootBuilder";
import UserProfileView from "../ui/userProfile";

export class UserProfileController {
  private view: UserProfileView = new UserProfileView();

  private setContent(username: string, email: string) {
    this.view.setUsername(username);
    this.view.setEmail(email);
  }

  public getView(): HTMLElement | null {
    if (this.view) {
      return this.view.getVeiw();
    }
    return null;
  }

  public async loadUserData() {
    const userData = await requestAPI.apiRoot().me().get().execute();
    this.setContent(userData.body.firstName || "Anon", userData.body.email);
  }
}

const userProfileController = new UserProfileController();

export default userProfileController;
