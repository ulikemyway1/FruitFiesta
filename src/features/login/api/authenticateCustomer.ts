import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import loginCustomer from "../../../shared/api/loginCustomer";

import user from "../../../entities/user";
import requestAPI from "../../../shared/api/APIRootBuilder";
import basketModel from "../../../pages/basket/basketModel";

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

        const tokens = localStorage.getItem("token");
        if (tokens) {
          localStorage.setItem("auth-token", tokens);

          // save refresh token to avoid its deleting
          requestAPI.savedRefresh = JSON.parse(tokens).refreshToken;
          //
          //
        }

        user.userIsLoggedIn = true;
        user.userInfo = response.body.customer;

        // fetch actual user cart
        requestAPI
          .withPasswordFlow(customerAuthData.password, customerAuthData.email)
          .me()
          .activeCart()
          .get()
          .execute()
          .then((responseWithBasket) => {
            if (response.statusCode === 200) {
              basketModel.privateCart = responseWithBasket.body;
              basketModel.notify();
            }
          });
        user.notify();
        //
      }
    })
    .catch((e) => {
      if (e instanceof Error) {
        loginForm.showBadRequestError(e.message);
      }
    });
}
