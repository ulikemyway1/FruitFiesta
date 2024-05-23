import { router, Hash } from "../routing";
import AppModel from "./appModel";
import AppView from "./appView";

import user from "../../entities/user";
import header from "../../widgets/header";

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;

    this.view = view;

    user.attach(header);
  }

  run() {
    router.run();

    if (user.userIsLoggedIn) {
      router.navigate(Hash.MAIN);
    } else {
      router.navigate(Hash.LOGIN);
    }
  }
}

const appController = new AppController(new AppModel(), new AppView());

export default appController;
