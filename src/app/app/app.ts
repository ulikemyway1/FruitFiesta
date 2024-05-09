import { router, Hash } from "../routing";

class App {
  private container: HTMLElement = document.body;

  constructor() {
    this.container.classList.add("body");
  }

  run() {
    console.log(this);

    const IsLoggedIn = false;

    router.run();

    if (IsLoggedIn) {
      router.navigate(Hash.MAIN);
      // window.location.hash = Hash.MAIN;
    } else {
      router.navigate(Hash.LOGIN);
      // window.location.hash = Hash.LOGIN;
    }
  }
}

export default App;
