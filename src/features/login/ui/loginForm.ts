import CreateElement from "../../../shared/helpers/element-create";
import logo from "../../../assets/images/logo.svg";
import "./login-form.scss";

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
    callback: this.emailInputHandler.bind(this),
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
    attributes: { placeholder: "Password", type: "password" },
    eventType: "input",
    callback: this.passwordInputHandler.bind(this),
  });

  eyeHint = new CreateElement<HTMLInputElement>({
    tag: "span",
    cssClasses: ["login-form__password-eye"],
    eventType: "click",
    callback: this.showHidePassword.bind(this),
  });

  passwordBox = new CreateElement<HTMLDivElement>({
    tag: "div",
    cssClasses: ["login-form__password-box"],
    children: [this.passwordInput, this.eyeHint],
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
    callback: this.submitHandler.bind(this),
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
    callback: this.linkToRegistration.bind(this),
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
  });

  checkAt(value: string) {
    const hasAt = value.includes("@");
    if (hasAt) {
      this.atError.getHTMLElement().classList.remove("error");
    } else {
      this.atError.getHTMLElement().classList.add("error");
    }
    return hasAt;
  }

  checkSpaces(value: string) {
    const hasNotSpaces = /^\S+$/.test(value);
    if (hasNotSpaces) {
      this.spacesError.getHTMLElement().classList.remove("error");
    } else {
      this.spacesError.getHTMLElement().classList.add("error");
    }
    return hasNotSpaces;
  }

  checkFullEmail(value: string) {
    const isEmailValid =
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(value);
    if (isEmailValid) {
      this.generalError.getHTMLElement().classList.remove("error");
      this.emailInput.getHTMLElement().classList.remove("error");
    } else {
      this.generalError.getHTMLElement().classList.add("error");
    }
    return isEmailValid;
  }

  linkToMainPage() {
    console.log("link to MainPage", this);
  }

  emailInputHandler() {
    const emailInputValue = this.emailInput.getHTMLElement().value;
    this.emailInput.getHTMLElement().classList.add("error");

    const spaces = this.checkSpaces(emailInputValue);
    const at = this.checkAt(emailInputValue);
    const general = this.checkFullEmail(emailInputValue);

    return spaces && at && general;
  }

  checkLength(value: string) {
    const isProperLength = value.length > 7;
    if (isProperLength) {
      this.lengthError.getHTMLElement().classList.remove("error");
    } else {
      this.lengthError.getHTMLElement().classList.add("error");
    }
    return isProperLength;
  }

  checkUppercase(value: string) {
    const hasUppercaseLetter = /[A-Z]/.test(value);
    if (hasUppercaseLetter) {
      this.uppercaseError.getHTMLElement().classList.remove("error");
    } else {
      this.uppercaseError.getHTMLElement().classList.add("error");
    }
    return hasUppercaseLetter;
  }

  checkLowercase(value: string) {
    const hasLowercaseLetter = /[a-z]/.test(value);
    if (hasLowercaseLetter) {
      this.lowercaseError.getHTMLElement().classList.remove("error");
    } else {
      this.lowercaseError.getHTMLElement().classList.add("error");
    }
    return hasLowercaseLetter;
  }

  checkDigits(value: string) {
    const hasDigits = /[0-9]/.test(value);
    if (hasDigits) {
      this.digitError.getHTMLElement().classList.remove("error");
    } else {
      this.digitError.getHTMLElement().classList.add("error");
    }
    return hasDigits;
  }

  checkSpecialChars(value: string) {
    const hasSpecialChars = /([!@#$%^&*]+)/.test(value);
    if (hasSpecialChars) {
      this.charError.getHTMLElement().classList.remove("error");
    } else {
      this.charError.getHTMLElement().classList.add("error");
    }
    return hasSpecialChars;
  }

  checkWhitespaces(value: string) {
    const hasWhitespaces = value.charAt(0) || value.charAt(-1);
    if (hasWhitespaces) {
      this.whitespaceError.getHTMLElement().classList.remove("error");
    } else {
      this.whitespaceError.getHTMLElement().classList.add("error");
    }
    return hasWhitespaces;
  }

  showHidePassword(event: Event) {
    const { target } = event;
    const input = this.passwordInput;

    if (input.getHTMLElement().getAttribute("type") === "password") {
      if (target instanceof HTMLElement) {
        target.classList.add("show");
      }
      input.getHTMLElement().setAttribute("type", "text");
    } else {
      if (target instanceof HTMLElement) {
        target.classList.remove("show");
      }
      input.getHTMLElement().setAttribute("type", "password");
    }
    return false;
  }

  passwordInputHandler() {
    const passwordInputValue = this.passwordInput.getHTMLElement().value;
    this.passwordInput.getHTMLElement().classList.add("error");

    const length = this.checkLength(passwordInputValue);
    const upperCase = this.checkUppercase(passwordInputValue);
    const lowerCase = this.checkLowercase(passwordInputValue);
    const digits = this.checkDigits(passwordInputValue);
    const specialChars = this.checkSpecialChars(passwordInputValue);
    const spaces = this.checkWhitespaces(passwordInputValue);

    const status =
      length && upperCase && lowerCase && digits && specialChars && spaces;
    if (status) {
      this.passwordInput.getHTMLElement().classList.remove("error");
    }
    return status;
  }

  linkToRegistration() {
    // For Stub
    console.log(this);
  }

  submitHandler() {
    if (this.passwordInputHandler() && this.emailInputHandler()) {
      this.linkToMainPage();
    }
  }

  draw() {
    return this.loginFormContainer;
  }
}

export default new LoginForm();
