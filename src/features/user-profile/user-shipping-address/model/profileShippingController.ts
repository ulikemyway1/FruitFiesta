import user from "../../../../entities/user";
import PlateController from "../../../../shared/ui/plate";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import "../ui/userShippingProfile.scss";

class UserShippingProfile {
  private model = new PlateController(["user-profile__shipping"]);

  private view = this.model.getView();

  public getView(): HTMLElement {
    return this.view;
  }

  private createContent(
    country: string,
    postalCode: string | undefined,
    city: string | undefined,
    stret: string | undefined,
  ): SectionContent[] {
    let content: SectionContent[] = [];
    content = [
      PlateController.createSectionContent(
        "Country",
        country || "Not provided",
      ),
      PlateController.createSectionContent(
        "Postal Code",
        postalCode || "Not provided",
      ),
      PlateController.createSectionContent("City", city || "Not provided"),
      PlateController.createSectionContent("Street", stret || "Not provided"),
    ];
    return content;
  }

  public update() {
    this.model.deleteAllSections();
    const { userInfo } = user;
    if (userInfo) {
      const shippingAdressIDs = userInfo.shippingAddressIds;
      const adresses = userInfo.addresses;
      adresses.forEach((address) => {
        if (
          address.id &&
          shippingAdressIDs &&
          shippingAdressIDs.includes(address.id)
        ) {
          this.model.addSection(
            "Shipping Address",
            this.createContent(
              address.country,
              address.postalCode,
              address.city,
              address.streetName,
            ),
            {
              editable: true,
            },
          );
        }
      });
    }
  }
}

const userBasicProfileController = new UserShippingProfile();
export default userBasicProfileController;
