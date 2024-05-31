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

  private submitBtn: HTMLButtonElement | null = null;

  private editBtn: HTMLButtonElement | null = null;

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
        cssClasses: ["plate__section-subtitle"],
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
        cssClasses: ["plate__button", "plate__edit-mark"],
        attributes: {
          title: "Edit",
        },
      }).getHTMLElement();

      this.editBtn = editMark;

      this.model.plateSections[sectionName].inEditMode = false;
      const applyBtn = this.createApplyBtn();
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
      const buttonWrapper = new CreateElement({
        tag: "div",
        cssClasses: ["plate__button-wrapper"],
      }).getHTMLElement();
      buttonWrapper.append(editMark);
      newSection.append(buttonWrapper);
      sectionModel.editMark = editMark;
    }
  }

  public getView(): HTMLElement {
    return this.view;
  }

  public getSubmitBtn(): HTMLButtonElement | null {
    return this.submitBtn;
  }

  public getEditBtn(): HTMLButtonElement | null {
    return this.editBtn;
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
        if (
          sectionContentElement.content instanceof HTMLInputElement ||
          sectionContentElement.content instanceof HTMLSelectElement
        ) {
          const input = sectionContentElement.content;
          input.disabled = true;
        }
      });
      this.model.plateSections[sectionName].inEditMode = false;
      if (event.target instanceof HTMLButtonElement) {
        this.view.classList.remove("plate__edit-mode");
        const editBtn = event.target;
        editBtn.classList.remove("plate__cancel-btn");
        editBtn.title = "Edit";
        applyBtn.remove();
      }
      this.cancelChanges(sectionName, sectionContent);
    } else {
      sectionContentElements.forEach((sectionContentElement) => {
        if (
          sectionContentElement.content instanceof HTMLInputElement ||
          sectionContentElement.content instanceof HTMLSelectElement
        ) {
          const input = sectionContentElement.content;
          input.disabled = false;
          this.model.plateSections[sectionName].inEditMode = true;
          if (event.target instanceof HTMLButtonElement) {
            this.view.classList.add("plate__edit-mode");
            const editBtn = event.target;
            editBtn.classList.add("plate__cancel-btn");
            editBtn.title = "Cancel";
            const parent = editBtn.parentElement;
            if (parent) parent.insertBefore(applyBtn, editBtn);
          }
        }
      });
    }
  }

  private createApplyBtn(): HTMLButtonElement {
    const applyBtn = new CreateElement<HTMLButtonElement>({
      tag: "button",
      cssClasses: ["plate__button", "plate__apply-btn"],
      attributes: {
        title: "Apply",
      },
    }).getHTMLElement();
    this.submitBtn = applyBtn;
    return applyBtn;
  }

  public cancelChanges(
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
