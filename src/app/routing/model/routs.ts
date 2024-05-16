import Router from "./router";
import mainPage from "../../../pages/main";
import Hash from "../../../shared/routs/enumHash";
import loginPage from "../../../pages/login/ui/loginPage";
import registrationPage from "../../../pages/registration";

import userProfileController from "../../../pages/userProfile/model/userProfilePageController";

import CreateElement from "../../../shared/helpers/element-create";

const router = new Router();

router.route(Hash.LOGIN, () => {
  Router.switchContent(loginPage.draw().getHTMLElement());
});
router.route(Hash.REGISTRATION, () => {
  Router.switchContent(registrationPage);
});
router.route(Hash.MAIN, () => {
  Router.switchContent(mainPage.getView());
});
router.route(Hash.CATALOG, () => {
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
router.route(Hash.USER, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "User",
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
  Router.switchContent(userProfileController.getView());
});

// router.route(Hash.EMPTY, () => {
//   console.log("empty hash");
//   document.body.innerHTML = "<h1>Empty hash</h1>";
// });

export default router;
