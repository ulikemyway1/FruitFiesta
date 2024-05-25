import { router, Hash } from "../routing";
import AppModel from "./appModel";
import AppView from "./appView";

import user from "../../entities/user";
import header from "../../widgets/header";

// kill it
import requestAPI from "../../shared/api/APIRootBuilder";

// kill it
function fetchProductByProductKey(key: string) {
  return requestAPI
    .apiRoot()
    .productProjections()
    .withKey({ key })
    .get()
    .execute();
}

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

    // kill it
    this.printProduct("ambarella");
  }

  // kill it
  async printProduct(key: string) {
    const { body } = await fetchProductByProductKey(key);
    console.log(body);
  }
}

const appController = new AppController(new AppModel(), new AppView());

export default appController;
