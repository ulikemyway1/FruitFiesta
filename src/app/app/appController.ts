import { router } from "../routing";
import Hash from "../../shared/routs/enumHash";
import AppModel from "./appModel";
import AppView from "./appView";

import user from "../../entities/user";
import header from "../../widgets/header";
import userBasicProfileController from "../../features/user-profile/user-basic";
import userShippingProfileController from "../../features/user-profile/user-address";
import userChangePasswordController from "../../features/user-profile/user-password";

import basketModel from "../../pages/basket/basketModel";

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;

    this.view = view;

    user.attach(header);
    basketModel.attach(header);
    user.attach(userBasicProfileController);
    user.attach(userShippingProfileController);
    user.attach(userChangePasswordController);
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
