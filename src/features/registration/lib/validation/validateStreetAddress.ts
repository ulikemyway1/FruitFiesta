import ValidationObject from "./IValidationObject";

export default function validateStreetAddress(
  address: string,
): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!(address.trim().length > 0)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Street address must contain at least one character";
  }
  return validationResult;
}
