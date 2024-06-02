import IValidationObject from "../../../lib/address/validation/IValidationObject";

export default class PlateModel {
  public plateSections: PlateSectionCollection = {};
}

export type PlateSectionCollection = {
  [sectionTitle: string]: PlateSectionModel;
};

export type PlateSectionModel = {
  sectionTitle: string;
  sectionContentWrapper: PlateSectionContentWrapper;
  editMark?: HTMLButtonElement;
  inEditMode?: boolean;
  savedValues?: string[];
  id?: string;
};

export type PlateSectionContentWrapper = {
  [sectionSubTitle: string]: SectionContent;
};

export type SectionContent = {
  sectionSubTitle: string;
  content: HTMLInputElement | HTMLSelectElement;
  validationObject: IValidationObject;
  validationFunction?: (input: string) => IValidationObject;
};
