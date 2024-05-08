import App from "./app/app/app";
import { router, Hash } from "./app/routing";

const app = new App();

app.run();

const IsLoggedIn = false;

if (IsLoggedIn) {
  router.navigate(Hash.MAIN);
} else {
  router.navigate(Hash.LOGIN);
}
