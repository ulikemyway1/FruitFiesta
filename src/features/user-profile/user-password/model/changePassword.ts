import user from "../../../../entities/user";
import validatePassword from "../../../../shared/lib/address/validation/validatePassword";
import PlateController from "../../../../shared/ui/plate";
import createSectionInputElement from "../../../../shared/ui/plate/lib/createSectionInputElement";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import changePassword from "../api/changePassword";
import "../ui/userChangePassword.scss";

class UserChangePassword {
  private model = new PlateController(["user-profile__change-password"]);

  private view = this.model.getView();

  public getView(): HTMLElement {
    return this.view;
  }

  private createContent(): SectionContent[] {
    let content: SectionContent[] = [];
    if (user.userIsLoggedIn) {
      content = [
        createSectionInputElement("Current Passport", ""),
        createSectionInputElement("New Password", "", validatePassword),
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
        )
          .then(() => this.model.switchModeAfterUpdate("Change password"))
          .catch((error) => {
            if (error instanceof Error) {
              this.model.showServerError(error.message, this.view);
            }
          }),
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

const userChangePasswordController = new UserChangePassword();
export default userChangePasswordController;
