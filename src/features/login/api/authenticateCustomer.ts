import Hash from "../../../shared/routs/enumHash";
import CustomerAuthData from "../model/ICustomerAuthData";
import { LoginFormView } from "../ui/loginFormView";
import requestAPI from "../../../shared/api/APIRootBuilder";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData,
  loginForm: LoginFormView,
): void {
  const apiRoot = requestAPI.withPasswordFlow(customerAuthData.password, customerAuthData.email);
  apiRoot
    .me().login().post({body: {'password': customerAuthData.password, 'email': customerAuthData.email}})
    .execute()
    .then((response) => {
      if (response.statusCode === 200) {
        loginForm.clearAuthForm();
        loginForm.hideBadRequestError();
        window.location.hash = Hash.MAIN;
        // save token as auth on success log ing for auto re-login
        localStorage.setItem("auth-token", localStorage.getItem("token")!);
      }
    })
    .catch(() => {
      loginForm.showBadRequestError();
    });
}
