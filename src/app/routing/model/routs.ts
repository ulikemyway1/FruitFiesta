import Router from "../../../shared/helpers/router";

const router = new Router();

enum Hash {
  LOGIN = "login",
  REGISTER = "registration",
  MAIN = "main",
  CATALOG = "catalog",
  DETAIL = "detail",
  USER = "user",
  BASKET = "basket",
  ABOUT = "about",
  NOT_FOUND = "not-found",
  EMPTY = "",
}

router.route(Hash.LOGIN, () => {
  // your callback function to switch the view
  console.log(Hash.LOGIN);
  document.body.innerHTML = "<h1>Login</h1>";
});
router.route(Hash.REGISTER, () => {
  console.log(Hash.REGISTER);
  document.body.innerHTML = "<h1>Register</h1>";
});
router.route(Hash.MAIN, () => {
  console.log(Hash.MAIN);
  document.body.innerHTML = "<h1>Main</h1>";
});
router.route(Hash.CATALOG, () => {
  console.log(Hash.CATALOG);
  document.body.innerHTML = "<h1>Catalog</h1>";
});
router.route(Hash.DETAIL, () => {
  console.log(Hash.DETAIL);
  document.body.innerHTML = "<h1>Detail</h1>";
});
router.route(Hash.USER, () => {
  console.log(Hash.USER);
  document.body.innerHTML = "<h1>User</h1>";
});
router.route(Hash.BASKET, () => {
  console.log(Hash.BASKET);
  document.body.innerHTML = "<h1>Basket</h1>";
});
router.route(Hash.ABOUT, () => {
  console.log(Hash.ABOUT);
  document.body.innerHTML = "<h1>About</h1>";
});
router.route(Hash.NOT_FOUND, () => {
  console.log(Hash.NOT_FOUND);
  document.body.innerHTML = "<h1>Not found</h1>";
});

router.route(Hash.EMPTY, () => {
  console.log("empty hash");
  document.body.innerHTML = "<h1>Empty hash</h1>";
});

export { router, Hash };
