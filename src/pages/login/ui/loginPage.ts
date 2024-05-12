import getLoginForm from "../../../features/login";
import CreateElement from "../../../shared/helpers/element-create";
import "./login-page.scss";

class LoginPage {
  main = new CreateElement({
    tag: "main",
    cssClasses: ["login-page"],
    children: [getLoginForm()],
  });

  draw() {
    return this.main;
  }
}

export default new LoginPage();
