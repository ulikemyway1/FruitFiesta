import * as EmailValidator from "email-validator";
import ValidationObject from "./IValidationObject";

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
