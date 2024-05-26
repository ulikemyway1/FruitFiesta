import user from "../../../../entities/user";
import CreateElement from "../../../../shared/helpers/element-create";
import PlateController from "../../../../shared/ui/plate";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import "../ui/userProfileAddresses.scss";

class UserProfileAddresses {
  private shippingModels: PlateController[] = [];

  private billingModels: PlateController[] = [];

  private shippingView: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["user-profile__shipping-addresses-block"],
  }).getHTMLElement();

  private billingView: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["user-profile__billing-addresses-block"],
  }).getHTMLElement();

  public getShippingView(): HTMLElement {
    return this.shippingView;
  }

  public getBillingView(): HTMLElement {
    return this.billingView;
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
    this.shippingModels = [];
    const { userInfo } = user;
    if (userInfo) {
      const shippingAddressIDs = userInfo.shippingAddressIds;
      const billingAddressId = userInfo.billingAddressIds;
      const adresses = userInfo.addresses;
      let shippingAddressCount = 0;
      let billingAddressCount = 0;
      adresses.forEach((address) => {
        if (
          address.id &&
          shippingAddressIDs &&
          shippingAddressIDs.includes(address.id)
        ) {
          shippingAddressCount += 1;
          const plateController = new PlateController([
            "user-profile__shipping-card",
          ]);
          this.shippingModels.push(plateController);
          plateController.addSection(
            `Shipping Address #${shippingAddressCount}`,
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
        } else if (
          address.id &&
          billingAddressId &&
          billingAddressId.includes(address.id)
        ) {
          billingAddressCount += 1;
          const plateController = new PlateController([
            "user-profile__billing-card",
          ]);
          this.billingModels.push(plateController);
          plateController.addSection(
            `Billing Address #${billingAddressCount}`,
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
    this.shippingModels.forEach((model) =>
      this.shippingView.append(model.getView()),
    );
    this.billingModels.forEach((model) =>
      this.billingView.append(model.getView()),
    );
  }
}

const userProfileAddresses = new UserProfileAddresses();
export default userProfileAddresses;
