// import loginPage from "../../pages/login/ui/loginPage";

class App {
  private container: HTMLElement = document.body;

  constructor() {
    this.container.classList.add("body");
  }

  run() {
    console.log(this);
    // this.container.append(loginPage.draw().getHTMLElement());
  }
}

export default App;
