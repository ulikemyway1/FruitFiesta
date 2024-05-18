import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import loginCustomer from "../../../shared/api/loginCustomer";
// eslint-disable-next-line import/no-cycle
import appController from "../../../app/app/appController";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData,
  loginForm: LoginFormView,
): void {
  loginCustomer(customerAuthData.email, customerAuthData.password)
    .then((response) => {
      if (response.statusCode === 200) {
        loginForm.clearAuthForm();
        loginForm.hideBadRequestError();
        window.location.hash = Hash.MAIN;
        // save token as auth on success log ing for auto re-login
        localStorage.setItem("auth-token", localStorage.getItem("token")!);
        appController.model.userIsLoggedIn = true;
      }
    })
    .catch(() => {
      loginForm.showBadRequestError();
    });
}
