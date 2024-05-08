import { router, Hash } from "./app/routing";

// get the user status, something like user.isLoggedIn
const IsLoggedIn = false;

if (IsLoggedIn) {
  router.navigate(Hash.MAIN);
} else {
  router.navigate(Hash.LOGIN);
}
