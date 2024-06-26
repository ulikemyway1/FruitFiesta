import user from "../../../../entities/user";
import validateBirthDate from "../../../../shared/lib/address/validation/validateBirthDate";
import validateEmail from "../../../../shared/lib/address/validation/validateEmail";
import validateName from "../../../../shared/lib/address/validation/validateName";
import PlateController from "../../../../shared/ui/plate";
import createSectionInputElement from "../../../../shared/ui/plate/lib/createSectionInputElement";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import updateBasic from "../api/updateBasic";
import "../ui/userBasicProfile.scss";

class UserBasicProfile {
  private model = new PlateController(["user-profile__basic"]);

  private view = this.model.getView();

  public getView(): HTMLElement {
    return this.view;
  }

  private createContent(): SectionContent[] {
    let content: SectionContent[] = [];
    if (user.userInfo) {
      const { firstName } = user.userInfo;
      const { lastName } = user.userInfo;
      const { dateOfBirth } = user.userInfo;
      const { email } = user.userInfo;
      content = [
        createSectionInputElement(
          "First Name",
          firstName || "Not provided",
          validateName,
        ),
        createSectionInputElement(
          "Last Name",
          lastName || "Not provided",
          validateName,
        ),
        createSectionInputElement(
          "Date of birth",
          dateOfBirth || "Not provided",
          validateBirthDate,
        ),
        createSectionInputElement(
          "Your e-mail",
          email || "Not provided",
          validateEmail,
        ),
      ];
      return content;
    }
    return content;
  }

  public update() {
    this.model.deleteAllSections();
    this.model.addSection("Some about you", this.createContent(), {
      editable: true,
    });
    this.setAPIHandler();
  }

  private setAPIHandler() {
    const applyBtn = this.model.getApplyBtn();
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        if (this.model.checkValidity("Some about you")) {
          updateBasic(
            this.view,
            this.model.getInputValueInSection("Some about you", "First Name"),
            this.model.getInputValueInSection("Some about you", "Last Name"),
            this.model.getInputValueInSection("Some about you", "Your e-mail"),
            this.model.getInputValueInSection(
              "Some about you",
              "Date of birth",
            ),
          )
            .then(() => this.model.switchModeAfterUpdate("Some about you"))
            .catch((error) => {
              if (error instanceof Error) {
                this.model.showServerError(error.message, this.view);
              }
            });
        }
      });
    }
  }
}

const userBasicProfileController = new UserBasicProfile();
export default userBasicProfileController;
