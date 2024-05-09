import apiRoot from "../../../shared/api/APIRoot";
import CustomerAuthData from "../model/ICustomerAuthData";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData
): void {
  apiRoot
    .login()
    .post({
      body: {
        email: customerAuthData.email,
        password: customerAuthData.password,
      },
    })
    .execute()
    .then((response) => console.log(response))
    .catch((e) => console.error(e));
}
