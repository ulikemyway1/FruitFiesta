import popup from "../../../shared/ui/popup";
import popupController from "../../../shared/ui/popup/model/popupController";
import CustomerData from "../model/ICustomerData";
import immediateLogin from "./immediateLogin";
import requestAPI from "../../../shared/api/APIRootBuilder";

export default function sendRequestCustomerCreation(
  customerData: CustomerData,
): void {
  const apiRoot = requestAPI.withAnonymousSessionFlow();
  apiRoot
    .me()
    .signup()
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
        // save token as auth on success for auto re-login
        localStorage.setItem("auth-token", localStorage.getItem("token")!);
        immediateLogin(customerData.email, customerData.password);
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
