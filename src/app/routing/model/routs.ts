// import CreateElement from "../../../shared/helpers/element-create";
import Router from "./router";
import user from "../../../entities/user";
import mainPage from "../../../pages/main";
import Hash from "../../../shared/routs/enumHash";
import loginPage from "../../../pages/login/ui/loginPage";
import registrationPage from "../../../pages/registration";
import userProfileController from "../../../pages/userProfile/model/userProfilePageController";
import CatalogPage from "../../../pages/catalog";
import notFoundPageView from "../../../pages/notFound";
import ProductDetailsPageView from "../../../pages/product-details/ui/productDetailsPageView";
import Basket from "../../../pages/basket";
import aboutPage from "../../../pages/about";

const router = new Router();

router.route(Hash.LOGIN, () => {
  if (user.userIsLoggedIn) {
    window.history.replaceState(null, "", Hash.MAIN);
    router.navigate(Hash.MAIN);
    return;
  }
  Router.switchContent(loginPage.draw().getHTMLElement());
});
router.route(Hash.REGISTRATION, () => {
  if (user.userIsLoggedIn) {
    window.history.back();
    return;
  }
  Router.switchContent(registrationPage);
});
router.route(Hash.MAIN, () => {
  Router.switchContent(mainPage.getView());
});

router.route(
  new RegExp(`^${Hash.CATALOG}(\\/[\\w-]*)*(\\?.*)?$`),

  (hash) => {
    Router.switchContent(new CatalogPage(hash).getView());
  },
);

router.route(new RegExp(`^${Hash.PRODUCT}(\\/[\\w-]+)$`), (hash) => {
  const productKey = hash.replace(`${Hash.PRODUCT}/`, "");
  Router.switchContent(new ProductDetailsPageView(productKey).getView());
});
router.route(Hash.BASKET, () => {
  Router.switchContent(new Basket().getHTMLElement());
});
router.route(Hash.ABOUT, () => {
  Router.switchContent(aboutPage.getHTMLElement());
});
router.route(Hash.NOT_FOUND, () => {
  Router.switchContent(notFoundPageView);
});
router.route(Hash.PROFILE, () => {
  if (!user.userIsLoggedIn) {
    window.history.back();
    return;
  }
  Router.switchContent(userProfileController.getView());
});

export default router;
