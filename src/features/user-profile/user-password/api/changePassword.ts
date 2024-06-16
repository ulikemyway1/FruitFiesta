import user from "../../../../entities/user";
import requestAPI from "../../../../shared/api/APIRootBuilder";
import loginCustomer from "../../../../shared/api/loginCustomer";

export default function changePassword(
  targetPlate: HTMLElement,
  currentPassword: string,
  newPassword: string,
) {
  targetPlate.classList.add("plate__pending");
  return requestAPI
    .apiRoot()
    .me()
    .password()
    .post({
      body: {
        version: user.userInfo?.version || 1,
        currentPassword,
        newPassword,
      },
    })
    .execute()
    .then(() => {
      setTimeout(() => targetPlate.classList.remove("plate__pending"), 1000);
    })
    .then(() => loginCustomer(user.userInfo?.email || "", newPassword))
    .then((response) => {
      // localStorage.setItem("auth-token", localStorage.getItem("token") || "");
      localStorage.setItem("LoggedIn", JSON.stringify(true));

      user.userInfo = response.body.customer;
    });
}

export type ChangePasswordType = typeof changePassword;
