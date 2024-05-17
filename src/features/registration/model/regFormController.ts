import Hash from "../../../shared/routs/enumHash";
import CreateElement from "../../../shared/helpers/element-create";
import sendRequestCustomerCreation from "../api/createCustomer";
import IValidationObject from "../lib/validation/IValidationObject";
import { isMemberOfCountriesSet } from "../lib/validation/postcodeValidationRules";
import validateBirthDate from "../lib/validation/validateBirthDate";
import validateCityAddress from "../lib/validation/validateCItyAddress";
import validateEmail from "../lib/validation/validateEmail";
import validateName from "../lib/validation/validateName";
import validatePassword from "../lib/validation/validatePassword";
import validatePostcode from "../lib/validation/validatePostcode";
import validateStreetAddress from "../lib/validation/validateStreetAddress";
import regFormView, { RegFormView } from "../ui/regFormView";
import regFormModel, { RegFormModel } from "./regFormModel";

export class RegFormController {
  view: RegFormView;

  model: RegFormModel;

  constructor(view: RegFormView, model: RegFormModel) {
    this.view = view;
    this.model = model;

    this.view.firstNameInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        this.model.inputs.firstName = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.lastNameInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        this.model.inputs.lastName = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.birthDateInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateBirthDate(e.target.valueAsNumber);
        this.model.inputs.birthDate = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    // Validate shipping address
    this.view.shippingCodeInput.addEventListener("blur", (e) => {
      let validationResult: IValidationObject;
      const selectedCountry =
        this.view.shippingCountryInput.options[
          this.view.shippingCountryInput.selectedIndex
        ].innerText;
      if (
        e.target instanceof HTMLInputElement &&
        isMemberOfCountriesSet(selectedCountry)
      ) {
        validationResult = validatePostcode(selectedCountry, e.target.value);
        this.model.inputs.shippingCode = validationResult;
      } else {
        validationResult = {
          status: "fail",
          validationMessage:
            "Sorry, we do not offer delivery in selected Country",
        };
        this.model.inputs.shippingCode = validationResult;
      }
      if (e.target instanceof HTMLInputElement)
        this.handleValidation(e.target, validationResult);
    });

    this.view.shippingCityInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        this.model.inputs.shippingCity = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.shippingStreetInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        this.model.inputs.shippingStreet = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    // Validate billing address
    this.view.billingCodeInput.addEventListener("blur", (e) => {
      let validationResult: IValidationObject;
      const selectedCountry =
        this.view.billingCountryInput.options[
          this.view.billingCountryInput.selectedIndex
        ].innerText;
      if (
        e.target instanceof HTMLInputElement &&
        isMemberOfCountriesSet(selectedCountry)
      ) {
        validationResult = validatePostcode(selectedCountry, e.target.value);
      } else {
        validationResult = {
          status: "fail",
          validationMessage:
            "Sorry, we do not offer delivery in selected Country",
        };
      }
      if (e.target instanceof HTMLInputElement)
        this.handleValidation(e.target, validationResult);
      this.model.inputs.billingCode = validationResult;
    });

    this.view.billingCityInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        this.model.inputs.billingCity = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.billingStreetInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        this.model.inputs.billingStreet = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });
    //

    this.view.emailInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateEmail(e.target.value);
        this.model.inputs.email = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.passwordInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validatePassword(e.target.value);
        this.model.inputs.password = validationResult;
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.singUpBtn
      .getHTMLElement()
      .addEventListener("click", async (e) => {
        e.preventDefault();
        this.startPageValidation();
        if (this.checkFormValidity()) {
          const customerData = this.view.collectData();
          sendRequestCustomerCreation(
            customerData,
            this.view.singUpBtn.getHTMLElement(),
          );
        }
      });

    this.view.pageContentWrapper.addEventListener("input", (e) => {
      if (
        e.target instanceof HTMLInputElement &&
        e.target.type !== "date" &&
        e.target.parentElement &&
        e.target.parentElement.classList.contains("input-wrapper") &&
        e.target.parentElement.lastElementChild
      ) {
        while (
          e.target.parentElement.lastElementChild &&
          e.target.parentElement.lastElementChild.classList.contains(
            "validation-error",
          )
        ) {
          e.target.parentElement.lastElementChild.remove();
        }
      }
    });

    this.view.setAsBillingAddress
      .getSwitcher()
      .addEventListener("input", () => {
        const alreadyChosen = !this.view.setAsBillingAddress.getStatus();
        if (alreadyChosen) {
          this.view.shippingSetAsBilling = false;
        } else {
          this.view.shippingSetAsBilling = true;
        }
      });

    this.view.nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.startPageValidation();
      if (this.checkFormValidity()) {
        this.view.goNextPage(e);
      }
    });

    this.view.prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const inputsKey = Object.keys(this.model.inputs);
      inputsKey.forEach((key) => {
        if (this.model.inputs[key].status === "fail") {
          delete this.model.inputs[key];
        }
      });
    });

    this.view.linkToSignIn.addEventListener(
      "click",
      RegFormController.navigateToLogin,
    );
  }

  public getView(): HTMLElement {
    return this.view.getFormView();
  }

  private startPageValidation(): void {
    let currentInputWrapper = this.view.pageContentWrapper.firstElementChild;
    while (currentInputWrapper) {
      const input = currentInputWrapper.firstElementChild;
      if (input instanceof HTMLInputElement) {
        input.dispatchEvent(new Event("blur"));
        if (input.type === "date") {
          input.dispatchEvent(new Event("input"));
        }
      }
      currentInputWrapper = currentInputWrapper.nextElementSibling;
    }
  }

  private checkFormValidity(): boolean {
    const inputsKey = Object.keys(this.model.inputs);
    let validationResult: boolean = true;
    inputsKey.forEach((key) => {
      if (this.model.inputs[key].status === "fail") {
        validationResult = false;
      }
    });
    return validationResult;
  }

  private showValidationError(errorMessage: string): void {
    const errorBox = new CreateElement({
      tag: "div",
      cssClasses: ["validation-error"],
      textContent: errorMessage,
    }).getHTMLElement();
    if (this instanceof HTMLInputElement && this.parentElement) {
      this.parentElement.append(errorBox);
    }
  }

  private deleteValidationError(): void {
    if (this instanceof HTMLInputElement && this.parentElement) {
      while (
        this.parentElement.lastElementChild &&
        this.parentElement.lastElementChild.classList.contains(
          "validation-error",
        )
      )
        this.parentElement.lastElementChild.remove();
    }
  }

  private handleValidation(
    target: HTMLElement,
    validationResult: IValidationObject,
  ) {
    this.deleteValidationError.call(target);
    if (validationResult.status === "fail") {
      this.showValidationError.call(target, validationResult.validationMessage);
    }
  }

  private resetForm(): void {
    this.view.billingCityInput.value = "";
    this.view.billingCodeInput.value = "";
    this.view.billingCountryInput.value = "PL";
    this.view.billingStreetInput.value = "";
    this.view.birthDateInput.value = "";
    this.view.shippingCityInput.value = "";
    this.view.shippingCodeInput.value = "";
    this.view.shippingCountryInput.value = "PL";
    this.view.shippingStreetInput.value = "";
    this.view.setDefaultShipping.setStatus(false);
    this.view.setDefaultBilling.setStatus(false);
    this.view.setAsBillingAddress.setStatus(false);
    this.view.shippingSetAsBilling = false;
    this.view.currentPageIndex = 0;
    this.view.goToPage(0);
  }

  static navigateToLogin(): void {
    window.location.hash = Hash.LOGIN;
  }
}

const regFormController = new RegFormController(regFormView, regFormModel);
export default regFormController;
