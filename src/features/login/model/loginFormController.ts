import sendRequestCustomerAuth from "../api/authenticateCustomer";
import loginFormView, { LoginFormView } from "../ui/loginFormView";

class LoginFormController {
  view: LoginFormView;

  constructor(view: LoginFormView) {
    this.view = view;
    this.view.signInButton
      .getHTMLElement()
      .addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        if (
          loginFormView.passwordInputHandler() &&
          loginFormView.emailInputHandler()
        ) {
          const customerAuthData = this.view.collectAuthData();
          sendRequestCustomerAuth(customerAuthData, this.view);
        }
      });
  }

  public getView(): HTMLElement {
    return this.view.getFormView();
  }
}

const loginFormController = new LoginFormController(loginFormView);
export default loginFormController;
