import CreateElement from "../../../shared/helpers/element-create";
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

// router.route(new RegExp(`^${Hash.CATALOG}(\\/[\\w-]*)?$`), (hash) => {
//   const key = hash.replace(`${Hash.CATALOG}`, "").replace("/", "");

//   if (!key) {
//     // catalogPage.loadProducts();  // If we want lazy loading of products
//     Router.switchContent(catalogPage.getView());
//   } else {
//     Router.switchContent(new ProductDetails(key).getHTMLElement());
//   }
// });

// router.route(Hash.CATALOG, () => {
//   Router.switchContent(catalogPage.getView());
// });
// router.route(new RegExp(`^${Hash.CATEGORY}(\\/[\\w-]+)$`), (hash) => {
//   const categoryKey = hash.replace(`${Hash.CATEGORY}/`, "");
//   Router.switchContent(
//     new CreateElement({
//       tag: "h1",
//       textContent: `Category: ${categoryKey}`,
//     }).getHTMLElement(),
//   );
// });

router.route(
  new RegExp(`^${Hash.CATALOG}(\\/[\\w-]*)?(\\/[\\w-]*)?$`),
  (hash) => {
    const path = hash
      .replace(`${Hash.CATALOG}`, "")
      .split("/")
      .filter((item) => item);

    if (path.length === 0) {
      // catalogPage.loadProducts();  // If we want lazy loading of products
      Router.switchContent(new CatalogPage().getView());
    } else {
      console.log("Path: ", path);
      // const queryArgs = {
      //   filter: `categories.id: subtree("${path}")`,
      // };
      Router.switchContent(new CatalogPage(path).getView());
    }
  }
);

router.route(new RegExp(`^${Hash.PRODUCT}(\\/[\\w-]+)$`), (hash) => {
  const productKey = hash.replace(`${Hash.PRODUCT}/`, "");
  Router.switchContent(new ProductDetailsPageView(productKey).getView());
});
router.route(Hash.BASKET, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "Basket",
    }).getHTMLElement()
  );
});
router.route(Hash.ABOUT, () => {
  Router.switchContent(
    new CreateElement({
      tag: "h1",
      textContent: "About",
    }).getHTMLElement()
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
