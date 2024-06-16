import { MyCustomerDraft } from "@commercetools/platform-sdk";
import popup from "../../../shared/ui/popup";
import popupController from "../../../shared/ui/popup/model/popupController";
import requestAPI from "../../../shared/api/APIRootBuilder";
import loginCustomer from "../../../shared/api/loginCustomer";
import SwitchRout from "../../../shared/routs/SwitchRout";
import user from "../../../entities/user";

export default function sendRequestCustomerCreation(
  customerData: MyCustomerDraft,
  button: HTMLInputElement,
  callback: () => void,
) {
  const initiator = button;
  initiator.disabled = true;
  const apiRoot = requestAPI.withAnonymousSessionFlow();
  apiRoot
    .me()
    .signup()
    .post({
      body: {
        email: customerData.email,
        password: customerData.password!,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        dateOfBirth: customerData.dateOfBirth,
        defaultShippingAddress: customerData.defaultShippingAddress,
        defaultBillingAddress: customerData.defaultBillingAddress,
        addresses: customerData.addresses,
      },
    })
    .execute()
    .then((response) => {
      if (response.statusCode === 201) {
        loginCustomer(customerData.email, customerData.password).then(
          (loginRequest) => {
            // save token as auth on success log ing for auto re-login

            // localStorage.setItem("auth-token", localStorage.getItem("token")!);
            localStorage.setItem("LoggedIn", JSON.stringify(true));

            requestAPI
              .withPasswordFlow(customerData.password, customerData.email)
              // .apiRoot()
              .me()
              .post({
                body: {
                  version: 1,
                  actions: [
                    {
                      action: "addShippingAddressId",
                      addressId: loginRequest.body.customer.addresses[1].id,
                    },
                    {
                      action: "addBillingAddressId",
                      addressId: loginRequest.body.customer.addresses[0].id,
                    },
                  ],
                },
              })
              .execute()
              .then((addressResponse) => {
                if (addressResponse.statusCode === 200) {
                  popupController.setStatus(
                    "ok",
                    response.body.customer.firstName || " ",
                  );
                  user.userIsLoggedIn = true;
                  user.userInfo = addressResponse.body;
                  user.notify();
                  document.body.append(popup);
                  setTimeout(() => {
                    SwitchRout.to(SwitchRout.path.MAIN);
                    callback();
                    popupController.toggleSiblings("on");
                    popupController.getViw().remove();
                  }, 2000);
                } else {
                  popupController.setStatus("fail");
                  document.body.append(popup);
                }
              });
          },
        );
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
    })
    .finally(() => {
      initiator.disabled = false;
    });
}
