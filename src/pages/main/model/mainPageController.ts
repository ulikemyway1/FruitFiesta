import MainPageView from "../ui/mainPageView";
import MainPageModel from "./mainPageModel";
import DiscountCardView from "../../../widgets/discountCard";

class MainPageController {
  model = MainPageModel;

  view = new MainPageView();

  constructor() {
    this.model.getDiscountCodes().then((discountCodes) => {
      discountCodes.forEach((discount) =>
        this.view.appendContent(
          new DiscountCardView({
            title: discount.title,
            text: discount.text,
            promoCode: discount.promoCode,
          }).getHTMLElement(),
        ),
      );
    });
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new MainPageController();
