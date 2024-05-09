import CreateElement from "../../../shared/helpers/element-create";
import CustomerData from "../model/ICustomerData";
import countryOptions from "../model/countries";
import "./regForm.scss";

export class RegFormView {
  private form = new CreateElement({
    tag: "form",
    cssClasses: ["registration-form"],
  }).getHTMLElement();

  private statusBar = new CreateElement({
    tag: "div",
    cssClasses: ["registration-form__status-bar"],
  }).getHTMLElement();

  private progressText = new CreateElement({
    tag: "span",
    cssClasses: ["registration-form__progress-text"],
  }).getHTMLElement();

  private progressLine = new CreateElement({
    tag: "div",
    cssClasses: ["registration-form__progress-line"],
  }).getHTMLElement();

  private pageTitle = new CreateElement<HTMLInputElement>({
    tag: "h2",
    cssClasses: ["registration-form__page-title"],
  }).getHTMLElement();

  public emailInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "email",
      required: "true",
      placeholder: "jondoe@gmail.com",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public passwordInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "password",
      required: "true",
      placeholder: "PASSWORD",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public firstNameInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "John",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public lastNameInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Doe",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public birthDateInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "date",
      required: "true",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public shippingCountryInput = new CreateElement<HTMLSelectElement>({
    tag: "select",
    attributes: {
      required: "true",
      placeholder: "Country",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public shippingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Street",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public shippingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "City",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public shippingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Post code",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public billingCountryInput = new CreateElement<HTMLSelectElement>({
    tag: "select",
    attributes: {
      required: "true",
      placeholder: "Country",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public billingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Street",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public billingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "City",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public billingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Post code",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  pages: { title: string; elements: HTMLElement[] }[] = [
    {
      title: "Some about you...",
      elements: [this.firstNameInput, this.lastNameInput, this.birthDateInput],
    },
    {
      title: "Shipping address",
      elements: [
        this.shippingCountryInput,
        this.shippingStreetInput,
        this.shippingCityInput,
        this.shippingCodeInput,
      ],
    },
    {
      title: "Billing address",
      elements: [
        this.billingCountryInput,
        this.billingStreetInput,
        this.billingCityInput,
        this.billingCodeInput,
      ],
    },
    {
      title: "Your login and password",
      elements: [this.emailInput, this.passwordInput],
    },
  ];

  currentPageIndex: number = 0;

  maxPageIndex: number = 0;

  private pageContentWrapper = new CreateElement({
    tag: "div",
    cssClasses: ["registration-form__page-content-wrapper"],
  }).getHTMLElement();

  public singUpBtn = new CreateElement<HTMLInputElement>({
    tag: "button",
    cssClasses: ["registration-form__sign-up"],
    textContent: "Sign Up",
  });

  public nextBtn = new CreateElement<HTMLInputElement>({
    tag: "button",
    cssClasses: ["registration-form__next-btn"],
    textContent: "Next",
    eventType: "click",
    callback: this.goNextPage.bind(this),
  }).getHTMLElement();

  constructor() {
    this.maxPageIndex = this.pages.length - 1;
    this.pageTitle.textContent = this.pages[this.currentPageIndex].title;
    this.statusBar.append(this.progressLine, this.progressText);
    this.progressText.textContent = `${this.currentPageIndex + 1} / ${this.maxPageIndex + 1}`;
    this.pages[this.currentPageIndex].elements.forEach((element) =>
      this.pageContentWrapper.append(element),
    );
    this.form.append(
      this.statusBar,
      this.pageTitle,
      this.pageContentWrapper,
      this.nextBtn,
    );

    countryOptions.forEach((country) => {
      const optionForShipping = new Option(country.name, country.short);
      const optionForBilling = new Option(country.name, country.short);
      this.shippingCountryInput.add(optionForShipping);
      this.billingCountryInput.add(optionForBilling);
    });
  }

  public getFormView(): HTMLElement {
    return this.form;
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

  private goNextPage(e: Event): void {
    e.preventDefault();
    if (this.currentPageIndex + 1 <= this.maxPageIndex) {
      this.currentPageIndex += 1;
      this.progressText.textContent = `${this.currentPageIndex + 1} / ${this.maxPageIndex + 1}`;
      this.progressLine.style.transform = `translateX(-${100 - (100 * this.currentPageIndex) / this.maxPageIndex}%)`;
    }
    this.showPageContent(this.currentPageIndex);
  }

  private showPageContent(pageIndex: number): void {
    while (this.pageContentWrapper.lastElementChild) {
      this.pageContentWrapper.lastElementChild.remove();
    }
    this.pageTitle.textContent = this.pages[pageIndex].title;
    this.pages[pageIndex].elements.forEach((element) =>
      this.pageContentWrapper.append(element),
    );
  }
}

const regFormView = new RegFormView();

export default regFormView;
