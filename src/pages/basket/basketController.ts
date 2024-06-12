import BasketModel from "./basketModel";
import BasketView from "./basketView";

export default class BasketController {
  private model: BasketModel;

  private view: BasketView;

  constructor() {
    this.model = new BasketModel();
    this.view = new BasketView();
    this.render();
  }

  async render() {
    const cart = await this.model.getCart();
    if (!cart) return;
    this.view.render(cart);
  }

  getHTMLElement(): HTMLElement {
    return this.view.getHTMLElement();
  }
}
