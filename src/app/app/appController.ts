import { router, Hash } from "../routing";
import requestAPI from "../../shared/api/APIRootBuilder";
import AppModel from "./appModel";
import AppView from "./appView";

class AppController {
  model: AppModel;

  view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }

  async run() {
    router.run();

    if (this.model.userIsLoggedIn) {
      router.navigate(Hash.MAIN);
      requestAPI.apiRoot().me().get().execute();
    } else {
      router.navigate(Hash.REGISTRATION);
    }
  }
}

const appController = new AppController(new AppModel(), new AppView());

export default appController;
