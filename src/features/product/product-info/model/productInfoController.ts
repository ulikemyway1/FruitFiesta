// import Hash from "../../../../shared/routs/enumHash";
import productInfoView, { ProductInfoView } from "../ui/productInfoView";
import productInfoModel, { ProductInfoModel } from "./productInfoModel";

export class ProductInfoController {
  view: ProductInfoView;

  model: ProductInfoModel;

  constructor(view: ProductInfoView, model: ProductInfoModel) {
    this.view = view;
    this.model = model;
  }

  public getView(): HTMLElement {
    return this.view.getProductInfoVue();
  }

  // static navigateToBasket(): void {
  //   window.location.hash = Hash.BASKET;
  // }
}

const productInfoController = new ProductInfoController(
  productInfoView,
  productInfoModel
);
export default productInfoController;
