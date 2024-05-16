import userProfileController from "../../userProfile/model/userProfileController";
import requestAPI from "../../../shared/api/APIRootBuilder";
import SwitchRout from "../../../shared/routs/SwitchRout";

export default async function immediateLogin(email: string, password: string) {
  const apiRoot = requestAPI.withPasswordFlow(password, email);
  await apiRoot
    .me()
    .login()
    .post({ body: { password, email } })
    .execute()
    .then((userData) => {
      userProfileController.updateUserProfile(
        userData.body.customer.firstName!,
        userData.body.customer.dateOfBirth!,
      );
      SwitchRout.to(SwitchRout.path.MAIN);
      // save token as auth on success for auto re-login
      localStorage.setItem("auth-token", localStorage.getItem("token")!);
    });
}
