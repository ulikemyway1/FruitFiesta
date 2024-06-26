import { MyCustomerDraft } from "@commercetools/platform-sdk";
import CreateElement from "../../../shared/helpers/element-create";
import countryOptions from "../model/countries";
import "./regForm.scss";
import logo from "../../../assets/images/logo.svg";
import SwitcherUI from "../../../shared/ui/switcherUI/UI/switcher";
import postcodeValidationRules from "../lib/validation/postcodeValidationRules";

export class RegFormView {
  public shippingSetAsBilling: boolean = false;

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

  private emailInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Email",
  }).getHTMLElement();

  public emailInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "email",
      required: "true",
      placeholder: "username@gmail.com",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private passwordInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Password",
  }).getHTMLElement();

  public passwordInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "password",
      required: "true",
      placeholder: "Password",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private firstNameInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "First name",
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

  private lastNameInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Last name",
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

  private birthDateInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Birthday",
  }).getHTMLElement();

  public birthDateInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "date",
      required: "true",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private shippingCountryInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Country",
  }).getHTMLElement();

  public shippingCountryInput = new CreateElement<HTMLSelectElement>({
    tag: "select",
    attributes: {
      required: "true",
      placeholder: "Poland",
    },
    cssClasses: [
      "registration-form__input-wide",
      "registration-form__country-input",
    ],
  }).getHTMLElement();

  private shippingStreetInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Street",
  }).getHTMLElement();

  public shippingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Marszalkowska street",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private shippingCityInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "City",
  }).getHTMLElement();

  public shippingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Warsaw",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private shippingCodeInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Post code",
  }).getHTMLElement();

  public shippingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "00-007",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public setDefaultShipping = new SwitcherUI("Set as default shipping address");

  public setAsBillingAddress = new SwitcherUI("Use as billing address");

  private billingCountryInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Country",
  }).getHTMLElement();

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

  private billingStreetInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Street",
  }).getHTMLElement();

  public billingStreetInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Marszalkowska street",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private billingCityInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "City",
  }).getHTMLElement();

  public billingCityInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "Warsaw",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  private billingCodeInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["registration-form__input-text"],
    textContent: "Post code",
  }).getHTMLElement();

  public billingCodeInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    attributes: {
      type: "text",
      required: "true",
      placeholder: "00-007",
    },
    cssClasses: ["registration-form__input-wide"],
  }).getHTMLElement();

  public setDefaultBilling = new SwitcherUI("Set as default billing address");

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

  public billingWrapper = RegFormView.insertWrapperWithElements([
    this.setDefaultBilling.getSwitcher(),
  ]);

  public shippingWrapper = RegFormView.insertWrapperWithElements([
    this.setDefaultShipping.getSwitcher(),
  ]);

  private eyeHint = new CreateElement<HTMLInputElement>({
    tag: "span",
    cssClasses: ["registration-form__password-eye"],
    eventType: "click",
    callback: this.showHidePassword.bind(this),
  }).getHTMLElement();

  public pages: { title: string; elements: HTMLElement[] }[] = [
    {
      title: "Create an account",
      elements: [
        RegFormView.insertWrapperWithElements([
          this.firstNameInputTitle,
          this.firstNameInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.lastNameInputTitle,
          this.lastNameInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.birthDateInputTitle,
          this.birthDateInput,
        ]),
      ],
    },
    {
      title: "Shipping address",
      elements: [
        this.shippingCountryInputTitle,
        this.shippingCountryInput,
        RegFormView.insertWrapperWithElements([
          this.shippingStreetInputTitle,
          this.shippingStreetInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.shippingCityInputTitle,
          this.shippingCityInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.shippingCodeInputTitle,
          this.shippingCodeInput,
        ]),
        this.shippingWrapper,
        RegFormView.insertWrapperWithElements([
          this.setAsBillingAddress.getSwitcher(),
        ]),
      ],
    },
    {
      title: "Billing address",
      elements: [
        RegFormView.insertWrapperWithElements([
          this.billingCountryInputTitle,
          this.billingCountryInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.billingStreetInputTitle,
          this.billingStreetInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.billingCityInputTitle,
          this.billingCityInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.billingCodeInputTitle,
          this.billingCodeInput,
        ]),
        this.billingWrapper,
      ],
    },
    {
      title: "Login and password",
      elements: [
        RegFormView.insertWrapperWithElements([
          this.emailInputTitle,
          this.emailInput,
        ]),
        RegFormView.insertWrapperWithElements([
          this.passwordInputTitle,
          this.passwordInput,
          this.eyeHint,
        ]),
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
    this.progressText.textContent = `${this.currentPageIndex + 1} of ${
      this.maxPageIndex + 1
    }`;
    this.pages[this.currentPageIndex].elements.forEach((element) =>
      this.pageContentWrapper.append(element),
    );
    this.paginationWrapper.append(this.nextBtn);

    this.footerLinkWrapper.append(this.linkToSignIn);

    this.form.append(
      this.logoImage,
      this.pageTitle,
      this.pageContentWrapper,
      this.statusBar,
      this.paginationWrapper,
      this.footerLinkWrapper,
    );

    countryOptions.forEach((country) => {
      const optionForShipping = new Option(country.name, country.short);
      const optionForBilling = new Option(country.name, country.short);
      this.shippingCountryInput.add(optionForShipping);
      this.billingCountryInput.add(optionForBilling);
    });

    this.shippingCountryInput.addEventListener("input", () => {
      const selectedOptionIndex =
        this.shippingCountryInput.options.selectedIndex;
      if (selectedOptionIndex || selectedOptionIndex === 0) {
        const selectedCountryName =
          this.shippingCountryInput.options.item(selectedOptionIndex)?.text;
        this.shippingCodeInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].postCodeInputPlaceholder;
        this.shippingCityInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].cityInputPlaceholder;
        this.shippingStreetInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].streetInputPlaceholder;
      }
    });

    this.billingCountryInput.addEventListener("input", () => {
      const selectedOptionIndex =
        this.billingCountryInput.options.selectedIndex;
      if (selectedOptionIndex || selectedOptionIndex === 0) {
        const selectedCountryName =
          this.billingCountryInput.options.item(selectedOptionIndex)?.text;
        this.billingCodeInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].postCodeInputPlaceholder;
        this.billingCityInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].cityInputPlaceholder;
        this.billingStreetInput.placeholder =
          postcodeValidationRules[
            selectedCountryName || "Poland"
          ].streetInputPlaceholder;
      }
    });
  }

  public getFormView(): HTMLElement {
    return this.form;
  }

  public collectData(): MyCustomerDraft {
    const shippingAsDefault = this.setDefaultShipping.getStatus();
    const billingAsDefault = this.setDefaultBilling.getStatus();
    const shippingDefaultIndex = shippingAsDefault ? 1 : undefined;
    const billingDefaultIndex = billingAsDefault ? 0 : undefined;
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
      defaultShippingAddress: shippingDefaultIndex,
      defaultBillingAddress: billingDefaultIndex,
    };
  }

  public goNextPage(e: Event): void {
    e.preventDefault();
    if (this.currentPageIndex + 1 <= this.maxPageIndex) {
      if (this.currentPageIndex === 0) {
        this.paginationWrapper.prepend(this.prevBtn);
      }
      if (this.currentPageIndex === 1 && this.shippingSetAsBilling) {
        this.billingCityInput.value = this.shippingCityInput.value;
        this.billingCodeInput.value = this.shippingCodeInput.value;
        this.billingCountryInput.value = this.shippingCountryInput.value;
        this.billingStreetInput.value = this.shippingStreetInput.value;
        this.currentPageIndex += 2;
      } else if (this.currentPageIndex === 1 && !this.shippingSetAsBilling) {
        this.billingCityInput.value = "";
        this.billingCodeInput.value = "";
        this.billingCountryInput.value = "PL";
        this.billingStreetInput.value = "";
        this.currentPageIndex += 1;
      } else {
        this.currentPageIndex += 1;
      }
      this.updateProgressBar();
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
      if (this.currentPageIndex === 1) {
        this.prevBtn.remove();
      }
      if (
        this.currentPageIndex === this.maxPageIndex &&
        this.shippingSetAsBilling
      ) {
        this.currentPageIndex -= 2;
      } else {
        this.currentPageIndex -= 1;
      }
      this.updateProgressBar();
      if (this.currentPageIndex !== this.maxPageIndex) {
        this.singUpBtn.getHTMLElement().remove();
        this.paginationWrapper.append(this.nextBtn);
      }
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

  public goToPage(pageNumber: number) {
    if (pageNumber >= 0 && pageNumber <= this.maxPageIndex) {
      this.currentPageIndex = pageNumber;
      this.showPageContent(this.currentPageIndex);
      if (pageNumber === 0) {
        this.prevBtn.remove();
      }
      if (pageNumber !== this.maxPageIndex) {
        this.singUpBtn.getHTMLElement().remove();
        this.paginationWrapper.append(this.nextBtn);
        this.nextBtn.disabled = false;
      }
      this.updateProgressBar();
    }
  }

  private updateProgressBar(): void {
    this.progressText.textContent = `${this.currentPageIndex + 1} of ${
      this.maxPageIndex + 1
    }`;
    this.progressLine.style.transform = `translateX(-${
      100 - (100 * this.currentPageIndex) / this.maxPageIndex
    }%)`;
  }

  private showHidePassword(event: Event): boolean {
    const { target } = event;
    const input = this.passwordInput;

    if (input.getAttribute("type") === "password") {
      if (target instanceof HTMLElement) {
        target.classList.add("show");
      }
      input.setAttribute("type", "text");
    } else {
      if (target instanceof HTMLElement) {
        target.classList.remove("show");
      }
      input.setAttribute("type", "password");
    }
    return false;
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
