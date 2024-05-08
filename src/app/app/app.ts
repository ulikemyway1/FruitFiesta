import loginPage from "../../pages/login/ui/loginPage";

class App {
  private container: HTMLElement = document.body;

  constructor() {
    this.container.classList.add("body");
  }

  run() {
    this.container.append(loginPage.draw().getHTMLElement());
  }
}

export default App;
