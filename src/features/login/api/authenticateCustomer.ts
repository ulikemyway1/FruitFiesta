import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import loginCustomer from "../../../shared/api/loginCustomer";

import user from "../../../entities/user";

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

        user.userIsLoggedIn = true;
      }
    })
    .catch((e) => {
      if (e instanceof Error) {
        loginForm.showBadRequestError(e.message);
      }
    });
}
