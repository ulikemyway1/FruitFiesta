import loginCustomer from "../../../shared/api/loginCustomer";
import SwitchRout from "../../../shared/routs/SwitchRout";

export default async function immediateLogin(email: string, password: string) {
  loginCustomer(email, password)
    .then(() => {
      SwitchRout.to(SwitchRout.path.MAIN);
      // save token as auth on success for auto re-login
      localStorage.setItem("auth-token", localStorage.getItem("token")!);
    })
    .catch((error) => {
      if (error instanceof Error) console.log(error.message);
    });
}
