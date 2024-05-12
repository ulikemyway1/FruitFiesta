import ValidationObject from "./IValidationObject";

function calculateAge(customerDate: number) {
  const birthdate = new Date(customerDate);
  const currentDate = new Date(Date.now());

  let age = currentDate.getFullYear() - birthdate.getFullYear();
  const m = currentDate.getMonth() - birthdate.getMonth();

  if (m < 0 || (m === 0 && currentDate.getDate() < birthdate.getDate())) {
    age -= 1;
  }
  return age;
}
export default function validateBirthDate(date: number): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!date) {
    validationResult.status = "fail";
    validationResult.validationMessage = "Please, input your birthday";
    return validationResult;
  }
  const customerDate = date;
  const customerAge = calculateAge(customerDate);
  if (!(customerAge >= 12)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      "Apologies for any inconvenience, but you must be at least 12 years old to make a purchase in our store.";
  }
  return validationResult;
}
