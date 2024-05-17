import CreateElement from "../../../helpers/element-create";
import "./switcher.scss";

export default class SwitcherUI {
  private switcher = new CreateElement({
    tag: "label",
    cssClasses: ["switcher"],
  }).getHTMLElement();

  private checkbox = new CreateElement<HTMLInputElement>({
    tag: "input",
    cssClasses: ["switcher__checkbox"],
    attributes: { type: "checkbox" },
  }).getHTMLElement();

  private slider = new CreateElement({
    tag: "span",
    cssClasses: ["switcher__slider"],
  }).getHTMLElement();

  private textBox = new CreateElement({
    tag: "p",
    cssClasses: ["switcher__text-box"],
  }).getHTMLElement();

  private wrapper = new CreateElement({
    tag: "div",
    cssClasses: ["switcher__wrapper"],
  }).getHTMLElement();

  constructor(text?: string, className?: string) {
    this.switcher.append(this.checkbox, this.slider);
    if (text) {
      this.textBox.textContent = text;
      if (className) {
        this.wrapper.classList.add(className);
      }
    }
    this.wrapper.append(this.switcher, this.textBox);
  }

  public getSwitcher(): HTMLElement {
    return this.wrapper;
  }
}
