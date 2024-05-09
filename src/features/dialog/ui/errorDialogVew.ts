import CreateElement from "../../../shared/helpers/element-create";
import icon from "../../../assets/images/error-dialog-icon.png";
import "./error-dialog.scss";

export class ErrorDialogView {
  private errorLogo = new CreateElement<HTMLImageElement>({
    tag: "img",
    cssClasses: ["error-dialog__logo"],
    attributes: { src: icon },
  }).getHTMLElement();

  private errorMessage = new CreateElement<HTMLParagraphElement>({
    tag: "p",
    cssClasses: ["error-dialog__message"],
    textContent: "Sorry, invalid login or email!",
  }).getHTMLElement();

  public closeButton = new CreateElement<HTMLButtonElement>({
    tag: "button",
    cssClasses: ["login-form__button"],
    textContent: "Close",
  });

  private errorInnerForm = new CreateElement<HTMLFormElement>({
    tag: "form",
    cssClasses: ["error-dialog__form"],
    attributes: { method: "dialog" },
    children: [this.errorLogo, this.errorMessage, this.closeButton],
  }).getHTMLElement();

  public errorDialog = new CreateElement<HTMLDialogElement>({
    tag: "dialog",
    cssClasses: ["error-dialog"],
    children: [this.errorInnerForm],
  }).getHTMLElement();

  closeErrorDialog() {
    this.errorDialog.close();
  }

  openErrorDialog() {
    this.errorDialog.showModal();
  }

  getDialogView(): HTMLElement {
    return this.errorDialog;
  }
}

const errorDialogView = new ErrorDialogView();
export default errorDialogView;
