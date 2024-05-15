import MainPageView from "../ui/mainPageView";
import MainPageModel from "./mainPageModel";
import DiscountCardView from "../../../widgets/discountCard";
import ProductCardView from "../../../widgets/productCard";
// import apiRoot from "../../../shared/api/APIRootToken";

class MainPageController {
  model = MainPageModel;

  view = new MainPageView();

  constructor() {
    this.model.getDiscountCodes().then((discountCodes) => {
      discountCodes.forEach((discount) =>
        this.view.appendContent(
          new DiscountCardView(discount).getHTMLElement(),
        ),
      );
    });

    this.model.getRandomProducts().then((randomProducts) => {
      randomProducts.forEach((product) => {
        console.log(product);
        this.view.appendContent(new ProductCardView(product).getHTMLElement());
      });
    });

    // apiRoot.me().get().execute();
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new MainPageController();
