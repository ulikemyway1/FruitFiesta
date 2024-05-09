import CreateElement from "../../../shared/helpers/element-create";
import logo from "../../../assets/images/logo.svg";
import "./login-form.scss";
import CustomerAuthData from "../model/ICustomerAuthData";

export class LoginFormView {
  private logoImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["login-form__logo"],
    attributes: { src: logo },
  }).getHTMLElement();

  private loginForm = new CreateElement<HTMLFormElement>({
    tag: "form",
    cssClasses: ["login-form"],
  }).getHTMLElement();

  private loginFormTitle = new CreateElement<HTMLHeadingElement>({
    tag: "h2",
    cssClasses: ["login-form__title"],
    textContent: "Login",
  }).getHTMLElement();

  private emailInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__email-title"],
    textContent: "Email",
  }).getHTMLElement();

  private emailInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["login-form__email"],
    attributes: { placeholder: "username@gmail.com" },
    eventType: "input",
    callback: this.emailInputHandler.bind(this),
  }).getHTMLElement();

  private atError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Email must contain '@' symbol",
  }).getHTMLElement();

  private spacesError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Email must not contain spaces",
  }).getHTMLElement();

  private generalError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Not valid email, e.g user@example.com",
  }).getHTMLElement();

  private passwordInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__password-title"],
    textContent: "Password",
  }).getHTMLElement();

  private passwordInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["login-form__password"],
    attributes: { placeholder: "Password", type: "password" },
    eventType: "input",
    callback: this.passwordInputHandler.bind(this),
  }).getHTMLElement();

  private eyeHint = new CreateElement<HTMLInputElement>({
    tag: "span",
    cssClasses: ["login-form__password-eye"],
    eventType: "click",
    callback: this.showHidePassword.bind(this),
  }).getHTMLElement();

  private passwordBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["login-form__password-box"],
    children: [this.passwordInput, this.eyeHint],
  }).getHTMLElement();

  private lengthError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least 8 characters long",
  }).getHTMLElement();

  private uppercaseError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one uppercase letter (A-Z)",
  }).getHTMLElement();

  private lowercaseError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one lowercase letter (a-z)",
  }).getHTMLElement();

  private digitError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one digit (0-9)",
  }).getHTMLElement();

  private charError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one special character (!@#$%^&*)",
  }).getHTMLElement();

  private whitespaceError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "No leading or trailing whitespace",
  }).getHTMLElement();

  public signInButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["login-form__button"],
    textContent: "Sign in",
  });

  private hintText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__hint-box-text"],
    textContent: "Don’t have an account yet?",
  }).getHTMLElement();

  private hintLinkToRegistration = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__hint-box-link"],
    textContent: "Register for free",
    eventType: "click",
    callback: this.linkToRegistration.bind(this),
  }).getHTMLElement();

  private hintBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["login-form__hint-box"],
    children: [this.hintText, this.hintLinkToRegistration],
  }).getHTMLElement();

  private loginFormContainer = new CreateElement({
    tag: "article",
    cssClasses: ["login-form__container"],
    children: [
      this.logoImage,
      this.loginForm,
      this.loginFormTitle,
      this.emailInputTitle,
      this.emailInput,
      this.atError,
      this.spacesError,
      this.generalError,
      this.passwordInputTitle,
      this.passwordBox,
      this.lengthError,
      this.uppercaseError,
      this.lowercaseError,
      this.digitError,
      this.whitespaceError,
      this.charError,
      this.signInButton,
      this.hintBox,
    ],
  }).getHTMLElement();

  checkAt(value: string) {
    const hasAt = value.includes("@");
    if (hasAt) {
      this.atError.classList.remove("error");
    } else {
      this.atError.classList.add("error");
    }
    return hasAt;
  }

  checkSpaces(value: string) {
    const hasNotSpaces = /^\S+$/.test(value);
    if (hasNotSpaces) {
      this.spacesError.classList.remove("error");
    } else {
      this.spacesError.classList.add("error");
    }
    return hasNotSpaces;
  }

  checkFullEmail(value: string) {
    const isEmailValid =
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(value);
    if (isEmailValid) {
      this.generalError.classList.remove("error");
      this.emailInput.classList.remove("error");
    } else {
      this.generalError.classList.add("error");
    }
    return isEmailValid;
  }

  emailInputHandler() {
    const emailInputValue = this.emailInput.value;
    this.emailInput.classList.add("error");

    const spaces = this.checkSpaces(emailInputValue);
    const at = this.checkAt(emailInputValue);
    const general = this.checkFullEmail(emailInputValue);

    return spaces && at && general;
  }

  checkLength(value: string) {
    const isProperLength = value.length > 7;
    if (isProperLength) {
      this.lengthError.classList.remove("error");
    } else {
      this.lengthError.classList.add("error");
    }
    return isProperLength;
  }

  checkUppercase(value: string) {
    const hasUppercaseLetter = /[A-Z]/.test(value);
    if (hasUppercaseLetter) {
      this.uppercaseError.classList.remove("error");
    } else {
      this.uppercaseError.classList.add("error");
    }
    return hasUppercaseLetter;
  }

  checkLowercase(value: string) {
    const hasLowercaseLetter = /[a-z]/.test(value);
    if (hasLowercaseLetter) {
      this.lowercaseError.classList.remove("error");
    } else {
      this.lowercaseError.classList.add("error");
    }
    return hasLowercaseLetter;
  }

  checkDigits(value: string) {
    const hasDigits = /[0-9]/.test(value);
    if (hasDigits) {
      this.digitError.classList.remove("error");
    } else {
      this.digitError.classList.add("error");
    }
    return hasDigits;
  }

  checkSpecialChars(value: string) {
    const hasSpecialChars = /([!@#$%^&*]+)/.test(value);
    if (hasSpecialChars) {
      this.charError.classList.remove("error");
    } else {
      this.charError.classList.add("error");
    }
    return hasSpecialChars;
  }

  checkWhitespaces(value: string) {
    const hasWhitespaces = value.charAt(0) || value.charAt(-1);
    if (hasWhitespaces) {
      this.whitespaceError.classList.remove("error");
    } else {
      this.whitespaceError.classList.add("error");
    }
    return hasWhitespaces;
  }

  showHidePassword(event: Event) {
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

  passwordInputHandler() {
    const passwordInputValue = this.passwordInput.value;
    this.passwordInput.classList.add("error");

    const length = this.checkLength(passwordInputValue);
    const upperCase = this.checkUppercase(passwordInputValue);
    const lowerCase = this.checkLowercase(passwordInputValue);
    const digits = this.checkDigits(passwordInputValue);
    const specialChars = this.checkSpecialChars(passwordInputValue);
    const spaces = this.checkWhitespaces(passwordInputValue);

    const status =
      length && upperCase && lowerCase && digits && specialChars && spaces;
    if (status) {
      this.passwordInput.classList.remove("error");
    }
    return status;
  }

  linkToRegistration() {
    // router.navigate(Hash.REGISTER);
    console.log(this);
  }

  // submitForm() {
  //   if (this.passwordInputHandler() && this.emailInputHandler()) {
  //     this.linkToMainPage();
  //   }
  // }
  public collectAuthData(): CustomerAuthData {
    return {
      email: this.emailInput.value,
      password: this.passwordInput.value,
      // anonymousCart: {
      //   id: string;
      //   typeId: string;
      // };
    };
  }

  getFormView(): HTMLElement {
    return this.loginFormContainer;
  }
}

const loginFormView = new LoginFormView();
export default loginFormView;
