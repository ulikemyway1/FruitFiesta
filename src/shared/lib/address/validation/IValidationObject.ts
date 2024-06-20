interface IValidationObject {
  status: "ok" | "fail";
  validationMessage: string;
}

export default IValidationObject;
