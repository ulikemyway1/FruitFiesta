import ValidationObject from "./IValidationObject";

export default function validateName(name: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^[a-zA-Zа-яА-ЯёЁ]*$/.test(name) || !(name.length > 0)) {
    validationResult.status = "fail";
    if (!(name.length > 0)) {
      validationResult.validationMessage = "Required one and more symbols";
    } else {
      validationResult.validationMessage = "Only letters accepted";
    }
  }
  return validationResult;
}
