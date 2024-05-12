import "./app/styles/index.scss";
import registrationForm from "./features/registration";
import apiRoot from "./shared/api/APIRoot";

document.body.append(registrationForm);

apiRoot
  .get()
  .execute()
  .then((resp) => console.log(resp));
