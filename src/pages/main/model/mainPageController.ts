import MainPageView from "../ui/mainPageView";
import DiscountBlockView from "../../../widgets/discountBlock";
import RandomProdBlockView from "../../../widgets/randomProdBlock";
import HeroView from "../../../widgets/heroBlock";
import CategoryView from "../../../widgets/categoryBlock/ui/categoryBlock";

class MainPageController {
  view = new MainPageView();

  constructor() {
    this.view.appendContent(new HeroView().getHTMLElement());

    this.view.appendContent(new CategoryView().getHTMLElement());

    this.view.appendContent(new DiscountBlockView().getHTMLElement());

    this.view.appendContent(new RandomProdBlockView().getHTMLElement());
  }

  getView() {
    return this.view.getHTMLElement();
  }
}

export default new MainPageController();
