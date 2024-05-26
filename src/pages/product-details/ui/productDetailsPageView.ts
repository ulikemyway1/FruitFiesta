import CreateElement from "../../../shared/helpers/element-create";
import productInfo from "../../../features/product/product-info";

class ProductDetailsPageView {
  private view: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["product-details-page"],
  }).getHTMLElement();

  constructor() {
    this.view.append(productInfo);
  }

  public getView(): HTMLElement {
    return this.view;
  }
}

const productDetailsPageView = new ProductDetailsPageView();

export default productDetailsPageView;
