import ValidationObject from "./IValidationObject";

export default function validatePassword(password: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/.test(password)) {
    validationResult.status = "fail";
    if (password.includes(" ")) {
      validationResult.validationMessage = "Spaces are not allowed";
    } else
      validationResult.validationMessage =
        "Password must contain minimum 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, and  at least 1 number";
  }
  return validationResult;
}
