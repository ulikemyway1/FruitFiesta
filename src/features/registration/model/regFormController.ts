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

class RegFormController {
  view: RegFormView;

  constructor(view: RegFormView) {
    this.view = view;

    this.view.firstNameInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.lastNameInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.birthDateInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateBirthDate(e.target.valueAsNumber);
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
      } else {
        validationResult = {
          status: "fail",
          validationMessage:
            "Sorry, we do not offer delivery in selected Country",
        };
      }
      if (e.target instanceof HTMLInputElement)
        this.handleValidation(e.target, validationResult);
    });

    this.view.shippingCityInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.shippingStreetInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    // Validate billing address
    this.view.billingCodeInput.addEventListener("blur", (e) => {
      let validationResult: IValidationObject;
      const selectedCoountry =
        this.view.billingCountryInput.options[
          this.view.billingCountryInput.selectedIndex
        ].innerText;
      if (
        e.target instanceof HTMLInputElement &&
        isMemberOfCountriesSet(selectedCoountry)
      ) {
        validationResult = validatePostcode(selectedCoountry, e.target.value);
      } else {
        validationResult = {
          status: "fail",
          validationMessage:
            "Sorry, we do not offer delivery in selected Country",
        };
      }
      if (e.target instanceof HTMLInputElement)
        this.handleValidation(e.target, validationResult);
    });

    this.view.billingCityInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.billingStreetInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });
    //

    this.view.emailInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateEmail(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.passwordInput.addEventListener("blur", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validatePassword(e.target.value);
        this.handleValidation(e.target, validationResult);
      }
    });

    this.view.singUpBtn.getHTMLElement().addEventListener("click", (e) => {
      e.preventDefault();
      const customerData = this.view.collectData();
      sendRequestCustomerCreation(customerData);
    });

    this.view.pageContentWrapper.addEventListener("input", (e) => {
      if (
        e.target instanceof HTMLInputElement &&
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
  }

  public getView(): HTMLElement {
    return this.view.getFormView();
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
}

const regFormController = new RegFormController(regFormView);
export default regFormController;
