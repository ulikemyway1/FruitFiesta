import apiRoot from "../../../shared/api/APIRoot";
import popup from "../../../shared/ui/popup";
import popupController from "../../../shared/ui/popup/model/popupController";
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
    .then((response) => {
      if (response.statusCode === 201) {
        popupController.setStatus(
          "ok",
          response.body.customer.firstName || " ",
        );
        document.body.append(popup);
      } else {
        popupController.setStatus("fail");
        document.body.append(popup);
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        if (error.message.includes("provided email")) {
          popupController.setStatus(
            "fail",
            undefined,
            `${error.message} Log in or use another email address, please`,
          );
        } else {
          popupController.setStatus(
            "fail",
            undefined,
            `${error.message}... Try again later...`,
          );
        }
        document.body.append(popup);
      }
    });
}
