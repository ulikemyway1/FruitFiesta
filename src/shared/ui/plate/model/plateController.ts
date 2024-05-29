import CreateElement from "../../../helpers/element-create";
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
  ): void {
    this.view.addSection(sectionName, sectionContent, props);
  }

  static createSectionContent(
    sectionSubtitle: string,
    value: string,
  ): SectionContent {
    const sectionContent: SectionContent = {
      sesctionSubTile: sectionSubtitle,
      content: new CreateElement<HTMLInputElement>({
        tag: "input",
        attributes: {
          value,
          disabled: "true",
        },
        cssClasses: ["plate__section-input"],
      }).getHTMLElement(),
    };

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
      if (input instanceof HTMLInputElement) {
        input.disabled = true;
      }
    });
  }
}
