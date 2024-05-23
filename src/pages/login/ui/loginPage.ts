// import errorDialog from "../../../features/dialog";
import authenticationForm from "../../../features/login";
import CreateElement from "../../../shared/helpers/element-create";
import "./login-page.scss";

class LoginPage {
  main = new CreateElement({
    tag: "main",
    cssClasses: ["login-page"],
    children: [authenticationForm],
  });

  draw() {
    return this.main;
  }
}

export default new LoginPage();
