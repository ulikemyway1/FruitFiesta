import Hash from "../../../app/routing/model/enumHash";
import apiRoot from "../../../shared/api/APIRoot";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData,
  loginForm: LoginFormView,
): void {
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email: customerAuthData.email,
        password: customerAuthData.password,
      },
    })
    .execute()
    .then((response) => {
      if (response.statusCode === 200) {
        loginForm.clearAuthForm();
        loginForm.hideBadRequestError();
        window.location.hash = Hash.MAIN;

        console.log((response.headers as Headers)?.get("Authorization"));
      }
    })
    .catch(() => {
      loginForm.showBadRequestError();
    });
}
