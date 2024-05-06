import CreateElement from "../../../shared/helpers/element-create";
import logo from "../../../assets/images/logo.svg";
import "./login-form.scss";
import {
  emailInputHandler,
  linkToRegistration,
  passwordInputHandler,
  submitHandler,
} from "../model/loginModel";

class LoginForm {
  logoImage = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["login-form__logo"],
    attributes: { src: logo },
  });

  loginForm = new CreateElement<HTMLFormElement>({
    tag: "form",
    cssClasses: ["login-form"],
  });

  loginFormTitle = new CreateElement<HTMLHeadingElement>({
    tag: "h2",
    cssClasses: ["login-form__title"],
    textContent: "Login",
  });

  emailInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__email-title"],
    textContent: "Email",
  });

  emailInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["login-form__email"],
    attributes: { placeholder: "username@gmail.com" },
    eventType: "input",
    callback: emailInputHandler.bind(this),
  });

  atError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Email must contain '@' symbol",
  });

  spacesError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Email must not contain spaces",
  });

  generalError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "Not valid email, e.g user@example.com",
  });

  passwordInputTitle = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__password-title"],
    textContent: "Password",
  });

  passwordInput = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["login-form__password"],
    attributes: { placeholder: "Password" },
    eventType: "input",
    callback: passwordInputHandler.bind(this),
  });

  lengthError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least 8 characters long",
  });

  uppercaseError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one uppercase letter (A-Z)",
  });

  lowercaseError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one lowercase letter (a-z)",
  });

  digitError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one digit (0-9)",
  });

  charError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "At least one special character (!@#$%^&*)",
  });

  whitespaceError = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__error"],
    textContent: "No leading or trailing whitespace",
  });

  signInButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["login-form__button"],
    textContent: "Sign in",
    eventType: "submit",
    callback: submitHandler.bind(this),
  });

  hintText = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__hint-box-text"],
    textContent: "Don’t have an account yet?",
  });

  hintLinkToRegistration = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["login-form__hint-box-link"],
    textContent: "Register for free",
    eventType: "click",
    callback: linkToRegistration.bind(this),
  });

  hintBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["login-form__hint-box"],
    children: [this.hintText, this.hintLinkToRegistration],
  });

  loginFormContainer = new CreateElement({
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
      this.passwordInput,
      this.lengthError,
      this.uppercaseError,
      this.lowercaseError,
      this.digitError,
      this.whitespaceError,
      this.charError,
      this.signInButton,
      this.hintBox,
    ],
  });

  draw() {
    return this.loginFormContainer;
  }
}

export default new LoginForm();
