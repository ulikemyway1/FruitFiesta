import "./modalMessage.scss";
import CreateElement from "../../shared/helpers/element-create";

export default class ModalMessage {
  private title = new CreateElement({
    tag: "h2",
    cssClasses: ["modal-message__title"],
    textContent: "Message",
  });

  private message = new CreateElement({
    tag: "p",
    cssClasses: ["modal-message__message"],
  });

  private confirmButton = new CreateElement({
    tag: "button",
    cssClasses: ["modal-message__confirm-button"],
    textContent: "OK",
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["modal-message__content"],
    children: [this.title, this.message, this.confirmButton],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["modal-message"],
    children: [this.content],
  });

  constructor(messageText: string) {
    this.message.getHTMLElement().textContent = messageText;

    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = "hidden";

    this.confirmButton.getHTMLElement().addEventListener("click", () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";

      this.container.getHTMLElement().remove();
    });
  }

  getHTMLElement(): HTMLElement {
    return this.container.getHTMLElement();
  }
}
