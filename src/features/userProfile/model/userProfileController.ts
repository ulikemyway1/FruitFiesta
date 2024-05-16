import userProfileView, { UserProfileView } from "../UI/userProfileView";

export class UserProfileController {
  private view: UserProfileView;

  constructor(view: UserProfileView) {
    this.view = view;
  }

  public getView(): HTMLElement {
    return this.view.getView();
  }

  public updateUserProfile(username: string, mainContent: string): void {
    this.view.title.textContent = `Hello, ${username}`;
    this.view.main.textContent = mainContent;
  }
}

const userProfileController = new UserProfileController(userProfileView);

export default userProfileController;
