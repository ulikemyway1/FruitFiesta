import ValidationObject from "./IValidationObject";

export default function validateCityAddress(address: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^[a-zA-Zа-яА-ЯёЁ]*$/.test(address) || !(address.length > 0)) {
    validationResult.status = "fail";
    if (!(address.length > 0)) {
      validationResult.validationMessage =
        "City address must contain at least one character";
    } else {
      validationResult.validationMessage =
        "City address must contain no special characters or numbers";
    }
  }
  return validationResult;
}
