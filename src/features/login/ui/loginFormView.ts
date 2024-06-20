import CreateElement from "../../../shared/helpers/element-create";
import logo from "../../../assets/images/logo.svg";
import "./login-form.scss";
import CustomerAuthData from "../model/ICustomerAuthData";
import Hash from "../../../shared/routs/enumHash";
import checkLength from "../validation/checkLength";
import checkAt from "../validation/checkAt";
import checkUppercase from "../validation/checkUppercase";
import checkLowercase from "../validation/checkLowercase";
import checkSpaces from "../validation/checkSpaces";
import checkFullEmail from "../validation/checkFullEmail";
import checkDigits from "../validation/checkDigits";
import checkWhitespaces from "../validation/checkWhitespaces";
import checkSpecialChars from "../validation/checkSpecialChars";

export class LoginFormView {
  private registrationPage = Hash.REGISTRATION;

  private logoImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["login-form__logo"],
    attributes: { src: logo },
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
    attributes: { placeholder: "username@gmail.com", autocomplete: "" },
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
    attributes: {
      placeholder: "Password",
      type: "password",
      autocomplete: "",
      required: "true",
    },
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
    textContent: "Password must not contain spaces",
  }).getHTMLElement();

  invalidLoginOrPassword = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__request-error"],
    textContent: "Sorry, invalid login or password!",
  }).getHTMLElement();

  signInButton = new CreateElement<HTMLButtonElement>({
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

  private loginForm = new CreateElement<HTMLFormElement>({
    tag: "form",
    cssClasses: ["login-form"],
    children: [
      this.logoImage,
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
      this.invalidLoginOrPassword,
      this.signInButton,
      this.hintBox,
    ],
  }).getHTMLElement();

  private loginFormContainer = new CreateElement({
    tag: "article",
    cssClasses: ["login-form__container"],
    children: [this.loginForm],
  }).getHTMLElement();

  emailInputHandler() {
    this.invalidLoginOrPassword.classList.remove("error");
    const emailInputValue = this.emailInput.value;
    this.emailInput.classList.add("error");

    const spaces = checkSpaces(emailInputValue, this.spacesError);
    const at = checkAt(emailInputValue, this.atError);
    const general = checkFullEmail(
      emailInputValue,
      this.generalError,
      this.emailInput
    );

    return spaces && at && general;
  }

  private showHidePassword(event: Event) {
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
    this.invalidLoginOrPassword.classList.remove("error");
    const passwordInputValue = this.passwordInput.value;
    this.passwordInput.classList.add("error");

    const length = checkLength(passwordInputValue, this.lengthError);
    const upperCase = checkUppercase(passwordInputValue, this.uppercaseError);
    const lowerCase = checkLowercase(passwordInputValue, this.lowercaseError);
    const digits = checkDigits(passwordInputValue, this.digitError);
    const specialChars = checkSpecialChars(passwordInputValue, this.charError);
    const spaces = checkWhitespaces(passwordInputValue, this.whitespaceError);

    const status =
      length && upperCase && lowerCase && digits && specialChars && spaces;
    if (status) {
      this.passwordInput.classList.remove("error");
    }
    return status;
  }

  private linkToRegistration() {
    window.location.hash = this.registrationPage;
  }

  collectAuthData(): CustomerAuthData {
    return {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
  }

  clearAuthForm() {
    this.emailInput.value = "";
    this.passwordInput.value = "";
  }

  showBadRequestError(message?: string) {
    if (message) {
      this.invalidLoginOrPassword.textContent = message;
    }
    this.invalidLoginOrPassword.classList.add("error");
  }

  hideBadRequestError() {
    this.invalidLoginOrPassword.classList.remove("error");
  }

  getFormView(): HTMLElement {
    return this.loginFormContainer;
  }
}

const loginFormView = new LoginFormView();
export default loginFormView;
