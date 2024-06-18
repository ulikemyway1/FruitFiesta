import basketModel from "./basketModel";
import BasketView from "./basketView";

export default class BasketController {
  // private model: BasketModel;

  private view: BasketView;

  constructor() {
    // this.model = new BasketModel();
    this.view = new BasketView();
    this.initialize();
  }

  async initialize() {
    const cart = await basketModel.loadSetGetCart();
    this.view.render(cart);
  }

  getHTMLElement(): HTMLElement {
    return this.view.getHTMLElement();
  }
}
