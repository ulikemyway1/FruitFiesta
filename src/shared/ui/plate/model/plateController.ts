import CreateElement from "../../../helpers/element-create";
import { CountryOptions } from "../../../lib/address/list/countries";
import IValidationObject from "../../../lib/address/validation/IValidationObject";
import PlateView from "../ui/plateView";
import PlateModel, { SectionContent } from "./plateModel";

export default class PlateController {
  private view: PlateView;

  private model: PlateModel;

  constructor(cssClasses?: string[]) {
    this.model = new PlateModel();
    this.view = new PlateView(this.model, cssClasses);
  }

  public getView(): HTMLElement {
    return this.view.getView();
  }

  public addSection(
    sectionName: string,
    sectionContent: SectionContent[],
    props?: {
      cssClasses?: string[];
      editable?: boolean;
    },
    id?: string,
  ): void {
    this.view.addSection(sectionName, sectionContent, props, id);
  }

  static createSectionInputElement(
    sectionSubtitle: string,
    value: string,
    validationFunction?: (input: string) => IValidationObject,
  ): SectionContent {
    const sectionContent: SectionContent = {
      sectionSubTitle: sectionSubtitle,
      content: new CreateElement<HTMLInputElement>({
        tag: "input",
        attributes: {
          value,
          disabled: "true",
        },
        cssClasses: ["plate__section-input"],
      }).getHTMLElement(),
      validationObject: { status: "ok", validationMessage: "Trusted" },
      validationFunction,
    };

    if (validationFunction)
      sectionContent.content.addEventListener("blur", (e) => {
        if (sectionContent.content instanceof HTMLInputElement) {
          const validationResults = validationFunction(
            sectionContent.content.value,
          );
          sectionContent.validationObject.status = validationResults.status;
          sectionContent.validationObject.validationMessage =
            validationResults.validationMessage;
        }
        const targetInput = e.target;
        if (
          sectionContent.validationObject.status === "fail" &&
          targetInput instanceof HTMLElement
        ) {
          const wrapper = targetInput.parentElement;
          if (wrapper) {
            const validationError = new CreateElement({
              tag: "span",
              cssClasses: ["plate__validation-error"],
              textContent: sectionContent.validationObject.validationMessage,
            }).getHTMLElement();
            wrapper.append(validationError);
          }
        }
      });

    // to remove  validation error
    sectionContent.content.addEventListener("input", (e) => {
      const targetInput = e.target;
      if (
        sectionContent.validationObject.status === "fail" &&
        targetInput instanceof HTMLElement
      ) {
        const wrapper = targetInput.parentElement;
        if (wrapper) {
          let { lastElementChild } = wrapper;
          while (
            lastElementChild &&
            lastElementChild.classList.contains("plate__validation-error")
          ) {
            lastElementChild.remove();
            lastElementChild = lastElementChild.previousElementSibling;
          }
        }
      }
    });
    //

    return sectionContent;
  }

  static createSectionSelectElement(
    sectionSubtitle: string,
    options: CountryOptions,
  ): SectionContent {
    const sectionContent: SectionContent = {
      sectionSubTitle: sectionSubtitle,
      content: new CreateElement<HTMLSelectElement>({
        tag: "select",
        attributes: {
          disabled: "true",
        },
        cssClasses: ["plate__section-input"],
      }).getHTMLElement(),
      validationObject: { status: "ok", validationMessage: "Trusted" },
    };
    options.forEach((country) => {
      const option = new Option(country.name, country.short);
      if (sectionContent.content instanceof HTMLSelectElement)
        sectionContent.content.add(option);
    });
    return sectionContent;
  }

  public deleteAllSections(): void {
    this.model.plateSections = {};
    const sectionWrapper = this.view.getView();
    while (sectionWrapper.lastElementChild) {
      sectionWrapper.lastElementChild.remove();
    }
  }

  public getPlateData() {
    return this.model.plateSections;
  }

  public getApplyBtn(): HTMLButtonElement | null {
    return this.view.getSubmitBtn();
  }

  public getInputValueInSection(sectionName: string, inputName: string) {
    return this.model.plateSections[sectionName].sectionContentWrapper[
      inputName
    ].content.value;
  }

  public switchModeAfterUpdate(sectionName: string): void {
    this.view.getView().classList.remove("plate__edit-mode");
    this.model.plateSections[sectionName].inEditMode = false;
    const editBtn = this.view.getEditBtn();
    const submitBtn = this.view.getSubmitBtn();
    if (editBtn && submitBtn) {
      editBtn.classList.remove("plate__cancel-btn");
      editBtn.title = "Edit";
      submitBtn.remove();
    }

    const sectionSubsections = Object.values(
      this.model.plateSections[sectionName].sectionContentWrapper,
    );
    sectionSubsections.forEach((subsection) => {
      const input = subsection.content;
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement
      ) {
        input.disabled = true;
      }
    });
  }

  public checkValidity(sectionName: string): boolean {
    const subsections = Object.values(
      this.model.plateSections[sectionName].sectionContentWrapper,
    );
    subsections.forEach((subsection) => subsection.content.blur());
    return subsections.every(
      (subsection) => subsection.validationObject.status === "ok",
    );
  }
}
