import CreateElement from "../../../shared/helpers/element-create";
import Router from "./router";
import user from "../../../entities/user";
import mainPage from "../../../pages/main";
import Hash from "../../../shared/routs/enumHash";
import loginPage from "../../../pages/login/ui/loginPage";
import registrationPage from "../../../pages/registration";
import userProfileController from "../../../pages/userProfile/model/userProfilePageController";

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
router.route(new RegExp(`^${Hash.CATALOG}(\\/\\d*)?$`), () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "Catalog",
    }).getHTMLElement(),
  );
});
router.route(Hash.DETAIL, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "Detail",
    }).getHTMLElement(),
  );
});
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
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "Not found",
    }).getHTMLElement(),
  );
});
router.route(Hash.PROFILE, () => {
  if (!user.userIsLoggedIn) {
    window.history.back();
    return;
  }
  Router.switchContent(userProfileController.getView());
});

export default router;
