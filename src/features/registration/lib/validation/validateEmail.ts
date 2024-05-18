import * as EmailValidator from "email-validator";
import ValidationObject from "./IValidationObject";

EmailValidator.validate("test@email.com"); // true

export default function validateEmail(email: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!EmailValidator.validate(email)) {
    validationResult.status = "fail";
    validationResult.validationMessage = "Please, check e-mail";
  }
  return validationResult;
}
