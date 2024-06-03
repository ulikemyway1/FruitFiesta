import user from "../../../../entities/user";
import requestAPI from "../../../api/APIRootBuilder";
import CreateElement from "../../../helpers/element-create";
import PlateView from "../ui/plateView";
import PlateModel, { SectionContent } from "./plateModel";

export default class PlateController {
  private view: PlateView;

  private model: PlateModel;

  constructor(cssClasses?: string[], canBeDeleted?: boolean) {
    this.model = new PlateModel();
    this.view = new PlateView(this.model, cssClasses, canBeDeleted);

    if (canBeDeleted) {
      const deletePlateBtn = this.view.getDeletePlateBtn();
      if (deletePlateBtn) {
        deletePlateBtn.addEventListener("click", () => {
          const plateSections = Object.values(this.model.plateSections);
          const plateID = plateSections[0].id;

          requestAPI
            .apiRoot()
            .me()
            .post({
              body: {
                version: user.userInfo!.version,
                actions: [
                  {
                    action: "removeAddress",
                    addressId: plateID,
                  },
                ],
              },
            })
            .execute()
            .then((response) => {
              this.view.getView().remove();
              user.userInfo = response.body;
            })
            .catch((error) => {
              if (error instanceof Error) {
                this.showServerError(error.message, this.view.getView());
              }
            });
        });
      }
    }
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
    this.view
      .getView()
      .querySelectorAll(".plate__validation-error")
      .forEach((item) => item.remove());
    this.view
      .getView()
      .querySelectorAll(".plate__error-box")
      .forEach((item) => item.remove());
  }

  public showServerError(errorMessage: string, plateOnSubmit: HTMLElement) {
    const errorBox = new CreateElement({
      tag: "div",
      cssClasses: ["plate__error-box"],
      textContent: errorMessage,
    }).getHTMLElement();
    plateOnSubmit
      .querySelectorAll(".plate__error-box")
      .forEach((item) => item.remove());
    plateOnSubmit.append(errorBox);
    plateOnSubmit.classList.remove("plate__pending");
  }

  public checkValidity(sectionName: string): boolean {
    if (this.smthChanged(sectionName)) {
      const subsections = Object.values(
        this.model.plateSections[sectionName].sectionContentWrapper,
      );
      subsections.forEach((subsection) => subsection.content.blur());
      return subsections.every(
        (subsection) => subsection.validationObject.status === "ok",
      );
    }
    return false;
  }

  private smthChanged(sectionName: string): boolean {
    const { savedValues } = this.model.plateSections[sectionName];
    const inputs = Object.values(
      this.model.plateSections[sectionName].sectionContentWrapper,
    );
    return inputs.some((input) => !savedValues?.includes(input.content.value));
  }
}
