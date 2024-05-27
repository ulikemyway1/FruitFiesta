import Hash from "../../../../shared/routs/enumHash";
import productInfoModel, { ProductInfoModel } from "./productInfoModel";
import getProductData from "../api/getProductData";
import productInfoView, { ProductInfoView } from "../ui/productInfoView";
import Router from "../../../../app/routing/model/router";
import notFoundPageView from "../../../../pages/notFound";

export class ProductInfoController {
  view: ProductInfoView;

  model: ProductInfoModel;

  constructor(view: ProductInfoView, model: ProductInfoModel) {
    this.view = view;
    this.model = model;
    this.getProduct("guava");
    this.view.addToCartButton.addEventListener("click", this.navigateToBasket);
    this.view.orderMinus.addEventListener("click", () => {
      this.decrementCounter();
    });
    this.view.orderPlus.addEventListener("click", () => {
      this.incrementCounter();
    });
  }

  async getProduct(productKey: string) {
    getProductData(productKey)
      .then((response) => {
        if (response.statusCode === 200) {
          this.view.drawProduct(response.body);
        }
      })
      .catch(() => {
        Router.switchContent(notFoundPageView);
      });
  }

  incrementCounter() {
    const quantity = Number(this.view.orderQuantity.textContent);
    if (quantity > 50) return;
    this.view.orderQuantity.textContent = `${quantity + 1}`;
  }

  decrementCounter() {
    const quantity = Number(this.view.orderQuantity.textContent);
    if (quantity === 1) return;
    this.view.orderQuantity.textContent = `${quantity - 1}`;
  }

  getView(): HTMLElement {
    return this.view.getProductInfoVue();
  }

  navigateToBasket(): void {
    window.location.hash = Hash.BASKET;
  }
}

const productInfoController = new ProductInfoController(
  productInfoView,
  productInfoModel
);
export default productInfoController;
