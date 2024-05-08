import apiRoot from "../../../shared/api/APIRoot";
import CustomerAuthData from "../model/ICustomerAuthData";

export default function sendRequestCustomerAuth(
  customerAuthData: CustomerAuthData
): void {
  apiRoot
    .customers()
    .post({
      body: {
        email: customerAuthData.email,
        password: customerAuthData.password,
      },
    })
    .execute()
    .then((respone) => console.log(respone))
    .catch((e) => console.error(e));
}
