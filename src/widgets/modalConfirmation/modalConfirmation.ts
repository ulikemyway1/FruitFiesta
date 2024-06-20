import "./modalConfirmation.scss";
import CreateElement from "../../shared/helpers/element-create";

export default class ModalConfirmation {
  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["modal-confirmation__title"],
    textContent: "Confirmation",
  });

  private message = new CreateElement({
    tag: "p",
    cssClasses: ["modal-confirmation__message"],
  });

  private confirmButton = new CreateElement({
    tag: "button",
    cssClasses: ["modal-confirmation__confirm-button"],
    textContent: "Confirm",
  });

  private cancelButton = new CreateElement({
    tag: "button",
    cssClasses: ["modal-confirmation__cancel-button"],
    textContent: "Cancel",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["modal-confirmation__content"],
    children: [this.title, this.message, this.confirmButton, this.cancelButton],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["modal-confirmation"],
    children: [this.content],
  });

  constructor(messageText: string, callback: () => void) {
    this.message.getHTMLElement().textContent = messageText;
    this.confirmButton.getHTMLElement().addEventListener("click", () => {
      callback();
      this.container.getHTMLElement().remove();
    });
    this.cancelButton.getHTMLElement().addEventListener("click", () => {
      this.container.getHTMLElement().remove();
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
