import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import loginCustomer from "../../../shared/api/loginCustomer";
import user from "../../../entities/user";
import tokenStorage from "../../../shared/state/model/tokenStorage";
import basketModel from "../../../pages/basket/basketModel";

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

        localStorage.setItem("LoggedIn", JSON.stringify(true));

        user.userIsLoggedIn = true;
        user.userInfo = response.body.customer;
        if (response.body.cart) {
          basketModel.cart = response.body.cart;
        }

        window.location.hash = Hash.MAIN;
      }
    })
    .catch((e) => {
      if (e instanceof Error) {
        loginForm.showBadRequestError(e.message);
      }
    });
}
