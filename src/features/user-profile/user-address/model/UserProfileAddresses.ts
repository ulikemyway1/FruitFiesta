import user from "../../../../entities/user";
import CreateElement from "../../../../shared/helpers/element-create";
import countryOptions from "../../../../shared/lib/address/list/countries";
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
    postalCode: string | undefined,
    city: string | undefined,
    stret: string | undefined,
  ): SectionContent[] {
    let content: SectionContent[] = [];
    content = [
      PlateController.createSectionSelectElement("Country", countryOptions),
      PlateController.createSectionInputElement(
        "Postal Code",
        postalCode || "Not provided",
      ),
      PlateController.createSectionInputElement("City", city || "Not provided"),
      PlateController.createSectionInputElement(
        "Street",
        stret || "Not provided",
      ),
    ];
    return content;
  }

  public update() {
    this.shippingModels = [];
    const { userInfo } = user;
    if (userInfo) {
      const shippingAddressIDs = userInfo.shippingAddressIds;
      const billingAddressId = userInfo.billingAddressIds;
      const { addresses } = userInfo;
      let shippingAddressCount = 0;
      let billingAddressCount = 0;
      addresses.forEach((address) => {
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
              address.postalCode,
              address.city,
              address.streetName,
            ),
            {
              editable: true,
            },
            address.id,
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
              address.postalCode,
              address.city,
              address.streetName,
            ),
            {
              editable: true,
            },
            address.id,
          );
        }
      });
    }
    this.shippingModels.forEach((model) => {
      this.shippingView.append(model.getView());
      this.setAPIHandler(model);
    });
    this.billingModels.forEach((model) => {
      this.billingView.append(model.getView());
      this.setAPIHandler(model);
    });
  }

  private setAPIHandler(model: PlateController) {
    const applyBtn = model.getApplyBtn();
    if (applyBtn) {
      applyBtn.addEventListener("click", async () => console.log("sss"));
    }
  }
}

const userProfileAddresses = new UserProfileAddresses();
export default userProfileAddresses;
