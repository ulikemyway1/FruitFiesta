import apiRoot from "../../../shared/api/APIRoot";
import CustomerData from "../model/ICustomerData";

export default function sendRequestCustomerCreation(
  customerData: CustomerData,
): void {
  apiRoot
    .customers()
    .post({
      body: {
        email: customerData.email,
        password: customerData.password,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        dateOfBirth: customerData.birthDate,
        addresses: [customerData.shippingAddress, customerData.billingAddress],
        defaultShippingAddress: 0,
        defaultBillingAddress: 1,
      },
    })
    .execute()
    .then((respone) => console.log(respone))
    .catch((e) => console.error(e));
}
