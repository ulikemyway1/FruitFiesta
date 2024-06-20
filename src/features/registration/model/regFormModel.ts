import IValidationObject from "../lib/validation/IValidationObject";

export class RegFormModel {
  inputs: RegFormInputs = {};
}

const regFormModel = new RegFormModel();

export default regFormModel;

type RegFormInputs = {
  [key: string]: IValidationObject;
};
