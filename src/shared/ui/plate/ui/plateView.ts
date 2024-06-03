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

  constructor(
    model: PlateModel,
    cssClasses?: string[],
    canBeDeleted?: boolean,
  ) {
    this.model = model;

    if (cssClasses) {
      this.view.classList.add(...cssClasses);
    }

    if (canBeDeleted) {
      this.view.append(this.createDeletePlateBtn());
    }
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
        textContent: sectionElement.sectionSubTitle,
      }).getHTMLElement();

      innerWrapper.append(sectionSubTitle, sectionElement.content);
      sectionContentWrapper.append(innerWrapper);

      sectionModel.sectionContentWrapper[sectionElement.sectionSubTitle] = {
        sectionSubTitle: sectionElement.sectionSubTitle,
        content: sectionElement.content,
        validationObject: sectionElement.validationObject,
        validationFunction: sectionElement.validationFunction,
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
      this.model.plateSections[sectionName].id = id;
      const applyBtn = this.createApplyBtn();

      editMark.addEventListener("click", (event) => {
        if (!this.model.plateSections[sectionName].inEditMode) {
          const savedValues: string[] = [];
          const sectionContentElements = Object.values(
            this.model.plateSections[sectionName].sectionContentWrapper,
          );
          sectionContentElements.forEach((contentElement) => {
            contentElement.content.blur();
            savedValues.push(contentElement.content.value);
          });
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
    sectionContentInView: SectionContent[],
  ): void {
    const { savedValues } = this.model.plateSections[sectionName];
    if (savedValues) {
      savedValues.forEach((prevValue, index) => {
        const elementInView = sectionContentInView[index].content;
        elementInView.value = prevValue;
      });
    }
    this.view
      .querySelectorAll(".plate__validation-error")
      .forEach((item) => item.remove());
    this.view
      .querySelectorAll(".plate__error-box")
      .forEach((item) => item.remove());
  }

  private createDeletePlateBtn(): HTMLButtonElement {
    const deleteBtn = new CreateElement<HTMLButtonElement>({
      tag: "button",
      cssClasses: ["plate__delete-plate-btn", "button"],
      attributes: {
        title: "Delete Address",
      },
    }).getHTMLElement();

    deleteBtn.innerHTML = `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path  class="delete-plate-path" d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="delete-plate-path" d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    return deleteBtn;
  }
}
