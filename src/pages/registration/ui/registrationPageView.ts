import "./registration.scss";
import registrationForm from "../../../features/registration";
import CreateElement from "../../../shared/helpers/element-create";

class RegistrationPageView {
  private view: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["registration-page"],
  }).getHTMLElement();

  constructor() {
    this.view.append(registrationForm);
  }

  public getView(): HTMLElement {
    return this.view;
  }
}

const registrationPageView = new RegistrationPageView();

export default registrationPageView;
