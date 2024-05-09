import ValidationObject from "./IValidationObject";

export default function validatePassword(password: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!_\-.,]{8,}$/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain minimum 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, and  at least 1 number. Also '!', '_', '-', '.', and ',' allowed";
  }
  return validationResult;
}
