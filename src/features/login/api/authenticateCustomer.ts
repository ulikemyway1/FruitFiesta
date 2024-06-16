import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import loginCustomer from "../../../shared/api/loginCustomer";

import user from "../../../entities/user";
import requestAPI from "../../../shared/api/APIRootBuilder";
import tokenStorage from "../../../shared/state/model/tokenStorage";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData,
  loginForm: LoginFormView,
): void {
  tokenStorage.clear();

  loginCustomer(customerAuthData.email, customerAuthData.password)
    .then((response) => {
      if (response.statusCode === 200) {
        loginForm.clearAuthForm();
        loginForm.hideBadRequestError();
        // window.location.hash = Hash.MAIN;
        // save token as auth on success log ing for auto re-login

        // localStorage.setItem("auth-token", localStorage.getItem("token")!);
        localStorage.setItem("LoggedIn", JSON.stringify(true));

        user.userIsLoggedIn = true;
        user.userInfo = response.body.customer;
        user.notify();

        // debugger;

        // setTimeout(() => {
        requestAPI
          .apiRoot()
          .me()
          .get()
          .execute()
          .then((responseee) => {
            console.log("User on LogIN!!!", responseee);
          });

        // console.log("requestAPI on LogIN!!!", requestAPI.apiRoot());
        // }, 3000);

        window.location.hash = Hash.MAIN;
      }
    })
    .catch((e) => {
      if (e instanceof Error) {
        loginForm.showBadRequestError(e.message);
      }
    });
}
