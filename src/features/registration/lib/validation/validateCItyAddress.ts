import ValidationObject from "./IValidationObject";

export default function validateCityAddress(address: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^[a-zA-Zа-яА-ЯёЁ\s]*$/.test(address) || !(address.trim().length > 0)) {
    validationResult.status = "fail";
    if (!(address.trim().length > 0)) {
      validationResult.validationMessage =
        "City address must contain at least one character";
    } else {
      validationResult.validationMessage =
        "City address must contain no special characters or numbers";
    }
  }
  return validationResult;
}
