import user from "../../../../entities/user";
import PlateController from "../../../../shared/ui/plate";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
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
        PlateController.createSectionContent(
          "First Name",
          firstName || "Not provided",
        ),
        PlateController.createSectionContent(
          "Last Name",
          lastName || "Not provided",
        ),
        PlateController.createSectionContent(
          "Date of birth",
          dateOfBirth || "Not provided",
        ),
        PlateController.createSectionContent(
          "Your e-mail",
          email || "Not provided",
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
  }
}

const userBasicProfileController = new UserBasicProfile();
export default userBasicProfileController;
