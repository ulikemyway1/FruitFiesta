import ValidationObject from "./IValidationObject";

export default function validateName(name: string): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!/^[a-zA-Zа-яА-ЯёЁ\s]*$/.test(name) || !(name.trim().length > 0)) {
    validationResult.status = "fail";
    if (!(name.trim().length > 0)) {
      validationResult.validationMessage = "Required at least one symbol";
    } else {
      validationResult.validationMessage = "Only letters accepted";
    }
  }
  return validationResult;
}
