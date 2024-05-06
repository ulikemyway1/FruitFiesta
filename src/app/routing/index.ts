import Router from "../../shared/helpers/router";

const router = new Router();

router.route("#login", () => {
  // your callback function to switch the view
  console.log("#login");
  document.body.innerHTML = "<h1>Login</h1>";
});
router.route("#register", () => {
  console.log("#register");
  document.body.innerHTML = "<h1>Register</h1>";
});
router.route("#home", () => {
  console.log("#home");
  document.body.innerHTML = "<h1>Home</h1>";
});
router.route("", () => {
  // console.log("empty hash");
  // document.body.innerHTML = "<h1>Empty hash</h1>";
});

export default router;
