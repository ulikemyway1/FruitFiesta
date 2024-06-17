import "./modalLoadingScreen.scss";
import CreateElement from "../../shared/helpers/element-create";
import loadingGig from "../../assets/images/Youtube_loading_symbol_1_(wobbly).gif";

class ModalLoadingScreen {
  private img = new CreateElement({
    tag: "img",
    cssClasses: ["modal-loading-screen__img"],
    attributes: {
      src: loadingGig,
      alt: "Loading",
    },
  });

  private content = new CreateElement({
    tag: "div",
    cssClasses: ["modal-loading-screen__content"],
    children: [this.img],
  });

  private container = new CreateElement({
    tag: "div",
    cssClasses: ["modal-loading-screen"],
    children: [this.content],
  });

  init() {
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = "hidden";
  }

  close() {
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";

    this.container.getHTMLElement().remove();
  }

  getHTMLElement(): HTMLElement {
    this.init();
    return this.container.getHTMLElement();
  }
}

export default new ModalLoadingScreen();
