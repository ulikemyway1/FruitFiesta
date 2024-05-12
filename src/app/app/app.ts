import { router, Hash } from "../routing";

class App {
  private container: HTMLElement = document.body;

  constructor() {
    this.container.classList.add("body");
  }

  run() {
    console.log(this);

    const isLoggedIn = false;

    router.run();

    if (isLoggedIn) {
      router.navigate(Hash.MAIN);
    } else {
      router.navigate(Hash.REGISTER);
    }
  }
}

export default App;
