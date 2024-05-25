import CreateElement from "../../../shared/helpers/element-create";
import Router from "./router";
import user from "../../../entities/user";
import mainPage from "../../../pages/main";
import Hash from "../../../shared/routs/enumHash";
import loginPage from "../../../pages/login/ui/loginPage";
import registrationPage from "../../../pages/registration";
import userProfileController from "../../../pages/userProfile/model/userProfilePageController";
import catalogPage from "../../../pages/catalog";
import notFoundPageView from "../../../pages/notFound";
import ProductDetails from "../../../pages/product-details";

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
router.route(new RegExp(`^${Hash.CATALOG}(\\/[\\w-]*)?$`), (match) => {
  const key = match.replace(`${Hash.CATALOG}`, "").replace("/", "");

  if (!key) {
    // catalogPage.loadProducts();  // If we want lazy loading of products
    Router.switchContent(catalogPage.getView());
  } else {
    Router.switchContent(new ProductDetails(key).getHTMLElement());
  }
});
// router.route(Hash.DETAIL, () => {
//   Router.switchContent(
//     new CreateElement({
//       tag: "h1",
//       textContent: "Detail",
//     }).getHTMLElement(),
//   );
// });
router.route(Hash.BASKET, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "Basket",
    }).getHTMLElement(),
  );
});
router.route(Hash.ABOUT, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "About",
    }).getHTMLElement(),
  );
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
