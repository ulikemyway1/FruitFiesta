import errorDialogView, { ErrorDialogView } from "../ui/errorDialogVew";

class ErrorDialogController {
  view: ErrorDialogView;

  constructor(view: ErrorDialogView) {
    this.view = view;
    this.view.closeButton
      .getHTMLElement()
      .addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        errorDialogView.openErrorDialog();
      });
  }

  public getView(): HTMLElement {
    return this.view.getDialogView();
  }
}

const errorDialogController = new ErrorDialogController(errorDialogView);
export default errorDialogController;
