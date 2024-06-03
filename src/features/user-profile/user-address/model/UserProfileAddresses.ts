import user from "../../../../entities/user";
import CreateElement from "../../../../shared/helpers/element-create";
import countryOptions from "../../../../shared/lib/address/list/countries";
import validateCityAddress from "../../../../shared/lib/address/validation/validateCItyAddress";
import validatePostcodeProfile from "../../../../shared/lib/address/validation/validatePostcodeProfile";
import validateStreetAddress from "../../../../shared/lib/address/validation/validateStreetAddress";
import PlateController from "../../../../shared/ui/plate";
import createSectionInputElement from "../../../../shared/ui/plate/lib/createSectionInputElement";
import createSectionSelectElement from "../../../../shared/ui/plate/lib/createSectionSelectElement";
import { SectionContent } from "../../../../shared/ui/plate/model/plateModel";
import addressRequest from "../api/addressRequest";
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
    street: string | undefined,
  ): SectionContent[] {
    let content: SectionContent[] = [];
    const selectElement = createSectionSelectElement("Country", countryOptions);
    content = [
      selectElement,
      createSectionInputElement(
        "Postal Code",
        postalCode || "Not provided",
        validatePostcodeProfile,
        selectElement.content as HTMLSelectElement,
      ),
      createSectionInputElement(
        "City",
        city || "Not provided",
        validateCityAddress,
      ),
      createSectionInputElement(
        "Street",
        street || "Not provided",
        validateStreetAddress,
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
          const plateController = new PlateController(
            ["user-profile__shipping-card"],
            true,
          );
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
          const plateController = new PlateController(
            ["user-profile__billing-card"],
            true,
          );
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
    this.shippingModels.forEach((model, index) => {
      this.shippingView.append(model.getView());
      this.setAPIHandler(model, `Shipping Address #${index + 1}`);
    });
    this.billingModels.forEach((model, index) => {
      this.billingView.append(model.getView());
      this.setAPIHandler(model, `Billing Address #${index + 1}`);
    });
  }

  private setAPIHandler(model: PlateController, sectionName: string) {
    const applyBtn = model.getApplyBtn();
    if (applyBtn) {
      applyBtn.addEventListener("click", async () => {
        if (model.checkValidity(sectionName)) {
          addressRequest(
            model.getView(),
            model.getPlateData()[sectionName].id!,
            model.getInputValueInSection(sectionName, "Country"),
            model.getInputValueInSection(sectionName, "City"),
            model.getInputValueInSection(sectionName, "Street"),
            model.getInputValueInSection(sectionName, "Postal Code"),
          )
            .then(() => model.switchModeAfterUpdate(sectionName))
            .catch((error) => {
              if (error instanceof Error) {
                model.showServerError(error.message, model.getView());
              }
            });
        }
      });
    }
  }
}

const userProfileAddresses = new UserProfileAddresses();
export default userProfileAddresses;
