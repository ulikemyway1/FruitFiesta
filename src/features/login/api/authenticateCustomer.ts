import Hash from "../../../app/routing/model/enumHash"; 
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
    .then((response) => {
      if (response.statusCode === 200) {
        window.location.hash = Hash.MAIN;
      }
    })
    .catch((e) => console.error(e));
}
