// import regFormController from "../../features/registration/model/regFormController";

class App {
  private container: HTMLElement = document.body;

  constructor() {
    this.container.classList.add("body");
  }

  run() {
    console.log(this);
    // this.container.append(regFormController.getView());
  }
}

export default App;
