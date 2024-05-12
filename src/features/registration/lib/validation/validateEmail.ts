import ValidationObject from "./IValidationObject";

export default function validateEmail(email: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^\S+@\S+\.\S+$/.test(email) || !(email.length > 0)) {
    validationResult.status = "fail";
    validationResult.validationMessage = "Please, check e-mail";
  }
  return validationResult;
}
