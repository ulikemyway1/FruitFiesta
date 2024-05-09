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

    this.view.firstNameInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.lastNameInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateName(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.birthDateInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateBirthDate(e.target.valueAsNumber);
        console.log(validationResult);
      }
    });

    // Validate shipping address
    this.view.shippingCodeInput.addEventListener("input", (e) => {
      let validationResult: IValidationObject;
      const selectedCoountry =
        this.view.shippingCountryInput.options[
          this.view.shippingCountryInput.selectedIndex
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
      console.log(validationResult);
    });

    this.view.shippingCityInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.shippingStreetInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        console.log(validationResult);
      }
    });

    // Validate billing address
    this.view.billingCodeInput.addEventListener("input", (e) => {
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
      console.log(validationResult);
    });

    this.view.billingCityInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateCityAddress(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.billingStreetInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateStreetAddress(e.target.value);
        console.log(validationResult);
      }
    });
    //

    this.view.emailInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validateEmail(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.passwordInput.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const validationResult = validatePassword(e.target.value);
        console.log(validationResult);
      }
    });

    this.view.singUpBtn.getHTMLElement().addEventListener("click", (e) => {
      e.preventDefault();
      const customerData = this.view.collectData();
      sendRequestCustomerCreation(customerData);
    });
  }

  public getView(): HTMLElement {
    return this.view.getFormView();
  }
}

const regFormController = new RegFormController(regFormView);
export default regFormController;
