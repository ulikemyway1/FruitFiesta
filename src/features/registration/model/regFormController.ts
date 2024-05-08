import sendRequestCustomerCreation from "../api/createCustomer";
import regFormView, { RegFormView } from "../ui/regFormView";

class RegFormController {
  view: RegFormView;

  constructor(view: RegFormView) {
    this.view = view;
    this.view.singUpBtn.getHTMLElement().addEventListener("click", (e) => {
      e.preventDefault();
      const customerData = this.view.collectData();
      sendRequestCustomerCreation(customerData);
    });
  }

  public getView(): HTMLElement {
    return this.view.getFormView();
  }
}

const regFormController = new RegFormController(regFormView);
export default regFormController;
