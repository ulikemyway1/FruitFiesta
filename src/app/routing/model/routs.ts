import Router from "../../../shared/helpers/router";
// import MainPageView from "../../../pages/main/ui/mainPage";
import Hash from "./enumHash";
import loginPage from "../../../pages/login/ui/loginPage";
import cleanContainer from "../../../shared/utils/clean-container";
import header from "../../../widgets/header";

const router = new Router();

router.route(Hash.LOGIN, () => {
  cleanContainer(document.body);
  document.body.append(header, loginPage.draw().getHTMLElement());
});
router.route(Hash.REGISTRATION, () => {
  console.log(Hash.REGISTRATION);
  cleanContainer(document.body);
  document.body.append(header, "<h1>Register</h1>");
});
router.route(Hash.MAIN, () => {
  cleanContainer(document.body);
  // document.body.append(header, mainPage.getView());
});
router.route(Hash.CATALOG, () => {
  console.log(Hash.CATALOG);
  cleanContainer(document.body);
  document.body.append(header, "<h1>Catalog</h1>");
});
router.route(Hash.DETAIL, () => {
  console.log(Hash.DETAIL);
  cleanContainer(document.body);
  document.body.append(header, "<h1>Detail</h1>");
});
router.route(Hash.USER, () => {
  console.log(Hash.USER);
  document.body.innerHTML = "<h1>User</h1>";
});
router.route(Hash.BASKET, () => {
  console.log(Hash.BASKET);
  cleanContainer(document.body);
  document.body.append(header, "<h1>Basket</h1>");
});
router.route(Hash.ABOUT, () => {
  console.log(Hash.ABOUT);
  cleanContainer(document.body);
  document.body.append(header, "<h1>About</h1>");
});
router.route(Hash.NOT_FOUND, () => {
  console.log(Hash.NOT_FOUND);
  cleanContainer(document.body);
  document.body.append(header, "<h1>Not found</h1>");
});

// router.route(Hash.EMPTY, () => {
//   console.log("empty hash");
//   document.body.innerHTML = "<h1>Empty hash</h1>";
// });

export default router;
