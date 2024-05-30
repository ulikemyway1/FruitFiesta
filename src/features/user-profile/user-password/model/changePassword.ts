import user from "../../../../entities/user";
import PlateController from "../../../../shared/ui/plate";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import changePassword from "../api/changePassword";
import "../ui/userChangePassword.scss";

class UserChangePasword {
  private model = new PlateController(["user-profile__change-password"]);

  private view = this.model.getView();

  public getView(): HTMLElement {
    return this.view;
  }

  private createContent(): SectionContent[] {
    let content: SectionContent[] = [];
    console.log(user.userIsLoggedIn);
    if (user.userIsLoggedIn) {
      content = [
        PlateController.createSectionContent("Current Passport", ""),
        PlateController.createSectionContent("New Password", ""),
      ];
      return content;
    }
    return content;
  }

  private setAPIHandler() {
    const applyBtn = this.model.getApplyBtn();
    if (applyBtn) {
      applyBtn.addEventListener("click", async () =>
        changePassword(
          this.view,
          this.model.getInputValueInSection(
            "Change password",
            "Current Passport",
          ),
          this.model.getInputValueInSection("Change password", "New Password"),
        ).then(() => this.model.switchModeAfterUpdate("Change password")),
      );
    }
  }

  public update() {
    this.model.deleteAllSections();
    this.model.addSection("Change password", this.createContent(), {
      editable: true,
    });
    this.setAPIHandler();
  }
}

const userChangePaswordController = new UserChangePasword();
export default userChangePaswordController;
