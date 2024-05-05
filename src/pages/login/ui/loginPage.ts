import CreateElement from "../../../shared/helpers/element-create";
import "./login.scss";

class LoginPage {
  logoImage = new CreateElement({
    tag: "img",
    cssClasses: ["login-page__logo"],
    attributes: { src: "./assets/favicon/icon.png" },
  });

  loginForm = new CreateElement({
    tag: "form",
    cssClasses: ["login-form"],
  });

  loginFormTitle = new CreateElement({
    tag: "h2",
    cssClasses: ["login-form__title"],
    textContent: "Login",
  });

  emailInputTitle = new CreateElement({
    tag: "p",
    cssClasses: ["login-form__email-title"],
    textContent: "Email",
  });

  emailInput = new CreateElement({
    tag: "input",
    cssClasses: ["login-form__email"],
    attributes: { placeholder: "username@gmail.com" },
    eventType: "input",
    callback: this.emailInputHandler.bind(this),
  });

  passwordInputTitle = new CreateElement({
    tag: "p",
    cssClasses: ["login-form__password-title"],
    textContent: "Password",
  });

  passwordInput = new CreateElement({
    tag: "input",
    cssClasses: ["login-form__password"],
    attributes: { placeholder: "Password" },
    eventType: "input",
    callback: this.passwordInputHandler.bind(this),
  });

  signInButton = new CreateElement({
    tag: "button",
    cssClasses: ["login-form__button"],
    textContent: "Sign in",
    eventType: "submit",
    callback: this.submitHandler.bind(this),
  });

  hintText = new CreateElement({
    tag: "p",
    cssClasses: ["login-form__hint-box-text"],
    textContent: "Don’t have an account yet?",
  });

  hintLinkToRegistration = new CreateElement({
    tag: "p",
    cssClasses: ["login-form__hint-box-link"],
    textContent: "Register for free",
    eventType: "click",
    callback: this.linkToRegistration.bind(this),
  });

  hintBox = new CreateElement({
    tag: "div",
    cssClasses: ["login-form__hint-box"],
    children: [this.hintText, this.hintLinkToRegistration],
  });

  loginFormContainer = new CreateElement({
    tag: "article",
    cssClasses: ["login-page__container"],
    children: [
      this.logoImage,
      this.loginForm,
      this.loginFormTitle,
      this.emailInputTitle,
      this.emailInput,
      this.passwordInputTitle,
      this.passwordInput,
      this.signInButton,
      this.hintBox,
    ],
  });

  main = new CreateElement({
    tag: "main",
    cssClasses: ["login-page"],
    children: [this.loginFormContainer],
  });

  linkToRegistration() {
    // For Stub
    console.log(this);
  }

  emailInputHandler() {
    // For Stub
    console.log(this);
  }

  passwordInputHandler() {
    // For Stub
    console.log(this);
  }

  submitHandler() {
    // For Stub
    console.log(this);
  }

  draw() {
    return this.main;
  }
}

export default new LoginPage();
