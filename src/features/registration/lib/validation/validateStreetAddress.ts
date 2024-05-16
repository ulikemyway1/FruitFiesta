import ValidationObject from "./IValidationObject";

export default function validateStreetAddress(
  address: string,
): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^[a-zA-Z0-9\s.,#-]+$/.test(address) || !(address.length > 0)) {
    validationResult.status = "fail";
    if (!(address.length > 0)) {
      validationResult.validationMessage =
        "Street address must contain at least one character";
    } else {
      validationResult.validationMessage =
        "Street address must contain no special characters";
    }
  }
  return validationResult;
}
