import "./plate.scss";
import CreateElement from "../../../helpers/element-create";
import PlateModel, {
  PlateSectionModel,
  SectionContent,
} from "../model/plateModel";

export default class PlateView {
  private view: HTMLElement = new CreateElement({
    tag: "section",
    cssClasses: ["plate"],
  }).getHTMLElement();

  private model: PlateModel;

  constructor(model: PlateModel, cssClasses?: string[]) {
    this.model = model;

    if (cssClasses) {
      this.view.classList.add(...cssClasses);
    }
  }

  public addSection(
    sectionName: string,
    sectionContent: SectionContent[],
    props?: {
      cssClasses?: string[];
      editable?: boolean;
      apiHandler?: () => Promise<void>;
    },
  ): void {
    const newSection = new CreateElement({
      tag: "div",
      cssClasses: ["plate__section"],
    }).getHTMLElement();

    if (props?.cssClasses) {
      newSection.classList.add(...props.cssClasses);
    }

    const sectionTitle = new CreateElement({
      tag: "div",
      cssClasses: ["plate__section-title"],
      textContent: sectionName,
    }).getHTMLElement();
    newSection.append(sectionTitle);
    const sectionContentWrapper = new CreateElement({
      tag: "div",
      cssClasses: ["plate__section-content-wrapper"],
    }).getHTMLElement();

    const sectionModel: PlateSectionModel = {
      sectionTitle: sectionName,
      sectionContentWrapper: {},
    };

    sectionContent.forEach((sectionElement) => {
      const innerWrapper = new CreateElement({
        tag: "div",
        cssClasses: ["plate__inner-wrapper"],
      }).getHTMLElement();
      const sectionSubTitle = new CreateElement({
        tag: "span",
        cssClasses: ["plate__section-subtile"],
        textContent: sectionElement.sesctionSubTile,
      }).getHTMLElement();
      innerWrapper.append(sectionSubTitle, sectionElement.content);
      sectionContentWrapper.append(innerWrapper);
      sectionModel.sectionContentWrapper[sectionElement.sesctionSubTile] = {
        sesctionSubTile: sectionElement.sesctionSubTile,
        content: sectionElement.content,
      };
    });

    newSection.append(sectionContentWrapper);
    this.model.plateSections[sectionName] = sectionModel;
    this.view.append(newSection);
    if (props?.editable) {
      const editMark = new CreateElement<HTMLButtonElement>({
        tag: "button",
        cssClasses: ["plate__edit-mark"],
        textContent: "edit",
      }).getHTMLElement();

      this.model.plateSections[sectionName].inEditMode = false;
      const applyBtn = this.createApplyBtn(props.apiHandler);
      editMark.addEventListener("click", (event) => {
        if (!this.model.plateSections[sectionName].inEditMode) {
          const savedValues: string[] = [];
          const sectionContentElements = Object.values(
            this.model.plateSections[sectionName].sectionContentWrapper,
          );
          sectionContentElements.forEach((contentElement) =>
            savedValues.push(contentElement.content.value),
          );
          this.model.plateSections[sectionName].savedValues = savedValues;
          this.switchMode.call(
            this,
            sectionName,
            sectionContent,
            event,
            applyBtn,
          );
        } else {
          this.switchMode.call(
            this,
            sectionName,
            sectionContent,
            event,
            applyBtn,
          );
        }
      });
      newSection.append(editMark);
      sectionModel.editMark = editMark;
    }
  }

  public getView(): HTMLElement {
    return this.view;
  }

  private switchMode(
    sectionName: string,
    sectionContent: SectionContent[],
    event: Event,
    applyBtn: HTMLButtonElement,
  ): void {
    const sectionContentElements = Object.values(
      this.model.plateSections[sectionName].sectionContentWrapper,
    );
    if (this.model.plateSections[sectionName].inEditMode) {
      sectionContentElements.forEach((sectionContentElement) => {
        if (sectionContentElement.content instanceof HTMLInputElement) {
          const input = sectionContentElement.content;
          input.disabled = true;
        }
      });
      this.model.plateSections[sectionName].inEditMode = false;
      if (event.target instanceof HTMLButtonElement) {
        const editBtn = event.target;
        editBtn.textContent = "Edit";
        applyBtn.remove();
      }
      this.cancelChanges(sectionName, sectionContent);
    } else {
      sectionContentElements.forEach((sectionContentElement) => {
        if (sectionContentElement.content instanceof HTMLInputElement) {
          const input = sectionContentElement.content;
          input.disabled = false;
          this.model.plateSections[sectionName].inEditMode = true;
          if (event.target instanceof HTMLButtonElement) {
            const editBtn = event.target;
            editBtn.textContent = "Cancel";
            const parent = editBtn.parentElement;
            if (parent) parent.insertBefore(applyBtn, editBtn);
          }
        }
      });
    }
  }

  private createApplyBtn(apiHandler?: () => Promise<void>): HTMLButtonElement {
    const applyBtn = new CreateElement<HTMLButtonElement>({
      tag: "button",
      textContent: "Apply",
      cssClasses: ["button", "plate__apply-btn"],
    }).getHTMLElement();
    if (apiHandler) applyBtn.addEventListener("click", apiHandler);
    return applyBtn;
  }

  private cancelChanges(
    sectionName: string,
    sectionContetInView: SectionContent[],
  ): void {
    const { savedValues } = this.model.plateSections[sectionName];
    if (savedValues) {
      savedValues.forEach((prevValue, index) => {
        const elementInView = sectionContetInView[index].content;
        elementInView.value = prevValue;
      });
    }
  }
}
