import productDetailsPageView from "../../pages/product-details/ui/productDetailsPageView";

export default class AppView {
  private container = document.body;

  constructor() {
    this.container.classList.add("body");
    // my development
    this.container.append(productDetailsPageView.getView());
  }
}
