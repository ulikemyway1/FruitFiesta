import { router, Hash } from "../routing";
import AppModel from "./appModel";
import AppView from "./appView";
import requestAPI from "../../shared/api/APIRootBuilder";

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }

  run() {
    router.run();
    if (this.model.userIsLoggedIn) {
      requestAPI.apiRoot().me().get().execute();
      router.navigate(Hash.MAIN);
    } else {
      router.navigate(Hash.REGISTRATION);
    }
  }
}

const appController = new AppController(new AppModel(), new AppView());

export default appController;
