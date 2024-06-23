import ValidationObject from "./IValidationObject";
import postcodeValidationRules, {
  CountriesSet,
} from "./postcodeValidationRules";

export default function validatePostcode(
  country: CountriesSet,
  postcode: string
): ValidationObject {
  const validationResult: ValidationObject = {
    status: "ok",
    validationMessage: "",
  };
  if (!postcodeValidationRules[country].validationPattern.test(postcode)) {
    validationResult.status = "fail";
    validationResult.validationMessage =
      postcodeValidationRules[country].validationErrorMessage;
  }

  return validationResult;
}
