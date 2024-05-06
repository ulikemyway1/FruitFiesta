import CreateElement from "../../../shared/helpers/element-create";
import "./login.scss";
import 

class LoginPage {
  main = new CreateElement({
    tag: "main",
    cssClasses: ["login-page"],
    children: [],
  });

  draw() {
    return this.main;
  }
}

export default new LoginPage();
