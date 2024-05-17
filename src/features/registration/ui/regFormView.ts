import { CustomerDraft } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import countryOptions from "../model/countries";
import "./regForm.scss";
import logo from "../../../assets/images/logo.svg";
import SwitcherUI from "../../../shared/ui/switcherUI/UI/switcher";

export class RegFormView {
  private logoImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["registration-form__logo"],
    attributes: { src: logo },
  }).getHTMLElement();

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
    cssClasses: [
      "registration-form__input-wide",
      "registration-form__country-input",
    ],
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

  public setDefaultShipping = new SwitcherUI(
    "Set as default shipping address",
  ).getSwitcher();

  public setAsBillingAddress = new SwitcherUI(
    "Use as billing address",
  ).getSwitcher();

  public billingCountryInput = new CreateElement<HTMLSelectElement>({
    tag: "select",
    attributes: {
      required: "true",
      placeholder: "Country",
    },
    cssClasses: [
      "registration-form__input-wide",
      "registration-form__country-input",
    ],
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

  public setDefaultBilling = new SwitcherUI(
    "Set as default billing address",
  ).getSwitcher();

  private footerLinkWrapper = new CreateElement({
    tag: "div",
    cssClasses: ["registration-form__footer-link-wrapper"],
    textContent: "Already have the account?",
  }).getHTMLElement();

  public linkToSignIn = new CreateElement<HTMLAnchorElement>({
    tag: "a",
    cssClasses: ["registration-form__footer-link"],
    textContent: "Login",
  }).getHTMLElement();

  pages: { title: string; elements: HTMLElement[] }[] = [
    {
      title: "Some about you...",
      elements: [
        RegFormView.insertWrapperWithElements([this.firstNameInput]),
        RegFormView.insertWrapperWithElements([this.lastNameInput]),
        RegFormView.insertWrapperWithElements([this.birthDateInput]),
      ],
    },
    {
      title: "Shipping address",
      elements: [
        this.shippingCountryInput,
        RegFormView.insertWrapperWithElements([this.shippingStreetInput]),
        RegFormView.insertWrapperWithElements([this.shippingCityInput]),
        RegFormView.insertWrapperWithElements([this.shippingCodeInput]),
        RegFormView.insertWrapperWithElements([this.setDefaultShipping]),
        RegFormView.insertWrapperWithElements([this.setAsBillingAddress]),
      ],
    },
    {
      title: "Billing address",
      elements: [
        this.billingCountryInput,
        RegFormView.insertWrapperWithElements([this.billingStreetInput]),
        RegFormView.insertWrapperWithElements([this.billingCityInput]),
        RegFormView.insertWrapperWithElements([this.billingCodeInput]),
        RegFormView.insertWrapperWithElements([this.setDefaultBilling]),
      ],
    },
    {
      title: "Your login and password",
      elements: [
        RegFormView.insertWrapperWithElements([this.emailInput]),
        RegFormView.insertWrapperWithElements([this.passwordInput]),
      ],
    },
  ];

  currentPageIndex: number = 0;

  maxPageIndex: number = 0;

  public pageContentWrapper = new CreateElement({
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
    textContent: "Continue",
  }).getHTMLElement();

  public prevBtn = new CreateElement<HTMLInputElement>({
    tag: "button",
    cssClasses: ["registration-form__prev-btn"],
    textContent: "Back",
    eventType: "click",
    callback: this.goPrevPage.bind(this),
    attributes: {
      disabled: "true",
    },
  }).getHTMLElement();

  private paginationWrapper = new CreateElement({
    tag: "div",
    cssClasses: ["registration-form__pagination-wrapper"],
  }).getHTMLElement();

  constructor() {
    this.maxPageIndex = this.pages.length - 1;
    this.pageTitle.textContent = this.pages[this.currentPageIndex].title;
    this.statusBar.append(this.progressLine, this.progressText);
    this.progressText.textContent = `${this.currentPageIndex + 1} / ${this.maxPageIndex + 1}`;
    this.pages[this.currentPageIndex].elements.forEach((element) =>
      this.pageContentWrapper.append(element),
    );
    this.paginationWrapper.append(this.prevBtn, this.nextBtn);

    this.footerLinkWrapper.append(this.linkToSignIn);

    this.form.append(
      this.statusBar,
      this.logoImage,
      this.pageTitle,
      this.pageContentWrapper,
      this.paginationWrapper,
      this.footerLinkWrapper,
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

  public collectData(): CustomerDraft {
    return {
      email: this.emailInput.value,
      password: this.passwordInput.value,
      firstName: this.firstNameInput.value,
      lastName: this.lastNameInput.value,
      dateOfBirth: this.birthDateInput.value,
      addresses: [
        {
          country: this.billingCountryInput.value,
          streetName: this.billingStreetInput.value,
          city: this.billingCityInput.value,
          postalCode: this.billingCodeInput.value,
        },
        {
          country: this.shippingCountryInput.value,
          streetName: this.shippingStreetInput.value,
          city: this.shippingCityInput.value,
          postalCode: this.shippingCodeInput.value,
        },
      ],
    };
  }

  public goNextPage(e: Event): void {
    e.preventDefault();
    if (this.currentPageIndex + 1 <= this.maxPageIndex) {
      this.currentPageIndex += 1;
      this.progressText.textContent = `${this.currentPageIndex + 1} / ${this.maxPageIndex + 1}`;
      this.progressLine.style.transform = `translateX(-${100 - (100 * this.currentPageIndex) / this.maxPageIndex}%)`;
    }
    if (this.currentPageIndex === this.maxPageIndex) {
      this.nextBtn.remove();
      this.paginationWrapper.append(this.singUpBtn.getHTMLElement());
    } else {
      this.singUpBtn.getHTMLElement().remove();
      this.paginationWrapper.append(this.nextBtn);
    }
    this.showPageContent(this.currentPageIndex);
    this.checkPagination();
  }

  private goPrevPage(e: Event): void {
    e.preventDefault();
    if (this.currentPageIndex - 1 >= 0) {
      this.currentPageIndex -= 1;
      this.progressText.textContent = `${this.currentPageIndex + 1} / ${this.maxPageIndex + 1}`;
      this.progressLine.style.transform = `translateX(-${100 - (100 * this.currentPageIndex) / this.maxPageIndex}%)`;
    }
    this.showPageContent(this.currentPageIndex);
    this.checkPagination();
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

  private checkPagination(): void {
    if (this.currentPageIndex < this.maxPageIndex) {
      this.nextBtn.disabled = false;
    } else {
      this.nextBtn.disabled = true;
    }

    if (this.currentPageIndex > 0) {
      this.prevBtn.disabled = false;
    } else {
      this.prevBtn.disabled = true;
    }
  }

  static insertWrapperWithElements(elements: HTMLElement[]): HTMLElement {
    const wrapper = new CreateElement({
      tag: "div",
      cssClasses: ["input-wrapper"],
      children: elements,
    }).getHTMLElement();
    return wrapper;
  }
}

const regFormView = new RegFormView();

export default regFormView;
