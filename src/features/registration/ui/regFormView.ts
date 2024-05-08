import CreateElement from "../../../shared/helpers/element-create";
import CustomerData from "../model/ICustomerData";
import "./regForm.scss";

export class RegFormView {
  private form = new CreateElement({
    tag: "form",
    cssClasses: ["registration-form"],
  });

  private emailInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "email",
      required: "true",
      placeholder: "jondoe@gmail.com",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private passwordInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "password",
      required: "true",
      placeholder: "PASSWORD",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private firstNameInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Jonh",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private lastNameInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Doe",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private birthDateInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "date",
      required: "true",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private firstLastDateWrapper = new CreateElement<HTMLInputElement>({
    tag: "div",
    cssClasses: ["registration-form__first-last-date-wrapper"],
  }).getHTMLElement();

  private shippingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Street",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private shippingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "City",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private shippingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Post code",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private shippingWrapper = new CreateElement<HTMLInputElement>({
    tag: "div",
    cssClasses: ["registration-form__shipping-wrapper"],
  }).getHTMLElement();

  private billingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Street",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private billingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "City",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private billingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Post code",
    },
    cssClasses: ["registration-form__input-short"],
  }).getHTMLElement();

  private billingWrapper = new CreateElement<HTMLInputElement>({
    tag: "div",
    cssClasses: ["registration-form__billing-wrapper"],
  }).getHTMLElement();

  public singUpBtn = new CreateElement<HTMLInputElement>({
    tag: "button",
    cssClasses: ["registration-form__sign-up"],
    textContent: "Sign Up",
  });

  constructor() {
    this.firstLastDateWrapper.append(
      this.firstNameInput,
      this.lastNameInput,
      this.birthDateInput,
    );

    this.shippingWrapper.append(
      this.shippingStreetInput,
      this.shippingCityInput,
      this.shippingCodeInput,
    );

    this.billingWrapper.append(
      this.billingStreetInput,
      this.billingCityInput,
      this.billingCodeInput,
    );

    this.form.addInnerElements([
      this.emailInput,
      this.passwordInput,
      this.firstLastDateWrapper,
      this.shippingWrapper,
      this.billingWrapper,
      this.singUpBtn,
    ]);
  }

  public getFormView(): HTMLElement {
    return this.form.getHTMLElement();
  }

  public collectData(): CustomerData {
    return {
      email: this.emailInput.value,
      password: this.passwordInput.value,
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      birthDate: this.birthDateInput.value,
      billingAddress: {
        street: this.billingStreetInput.value,
        city: this.billingCityInput.value,
        postCode: this.billingCityInput.value,
      },
      shippingAddress: {
        street: this.shippingStreetInput.value,
        city: this.shippingCityInput.value,
        postCode: this.shippingCodeInput.value,
      },
    };
  }
}

const regFormView = new RegFormView();

export default regFormView;
