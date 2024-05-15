// import apiRoot from "../../shared/api/APIRoot";
import apiRootToken from "../../shared/api/APIRootToken";
// import apiRootPass from "../../shared/api/APIRootPass";

// import { router, Hash } from "../routing";

class App {
  private container: HTMLElement = document.body;

  // constructor() {
  //   this.container.classList.add("body");
  // }
  // run() {
  //   console.log(this);
  //   const isLoggedIn = true;
  //   router.run();
  //   if (isLoggedIn) {
  //     router.navigate(Hash.MAIN);
  //   } else {
  //     router.navigate(Hash.REGISTRATION);
  // }

  run() {
    console.log("App is running", this.container);
    // apiRoot
    //   .me()
    //   .signup()
    //   .post({
    //     body: {
    //       email: "rrswdddewgfe@qwerty.com",
    //       password: "Qwerty1!",
    //       firstName: "Petya",
    //       lastName: "Pupkin",
    //       dateOfBirth: "2003-04-29",
    //       addresses: [
    //         {
    //           country: "FR",
    //           city: "Paris",
    //           streetName: "Lenina",
    //           postalCode: "F-12345",
    //         },
    //       ],
    //     },
    //   })
    //   .execute();

    // setTimeout(() => {
    // apiRootPass.me().get().execute();
    // }, 1000);

    // setTimeout(() => {
    apiRootToken.me().get().execute();
    // }, 2000);
  }
}

export default App;
