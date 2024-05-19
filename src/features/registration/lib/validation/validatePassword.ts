import ValidationObject from "./IValidationObject";

export default function validatePassword(password: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (password.length < 8) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain minimum 8 characters";
    return validationResult;
  }

  if (!/[A-Z]/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain at least 1 uppercase letter";
    return validationResult;
  }

  if (!/[a-z]/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain at least 1 lowercase letter";
    return validationResult;
  }

  if (!/[0-9]/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain at least 1 number";
    return validationResult;
  }

  if (!/[!@#$%^&*]/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Password must contain at least 1 special character (!@#$%^&*)";
    return validationResult;
  }

  if (/\s/.test(password)) {
    validationResult.status = "fail";
    validationResult.validationMessage = "Spaces are not allowed";
    return validationResult;
  }

  return validationResult;
}
