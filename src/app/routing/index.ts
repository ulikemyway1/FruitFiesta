import Router from "../../shared/helpers/router";

const router = new Router();

enum Hash {
  LOGIN = "#login",
  REGISTER = "#register",
  HOME = "#home",
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
router.route(Hash.HOME, () => {
  console.log(Hash.HOME);
  document.body.innerHTML = "<h1>Home</h1>";
});
router.route("", () => {
  // console.log("empty hash");
  // document.body.innerHTML = "<h1>Empty hash</h1>";
});

export default router;
