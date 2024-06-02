import CreateElement from "../../../helpers/element-create";
import IValidationObject from "../../../lib/address/validation/IValidationObject";
import { SectionContent } from "../model/plateModel";
import deleteValidationError from "./deleteValidationError";

export default function createSectionInputElement(
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
  sectionContent.content.addEventListener("focus", (e) =>
    deleteValidationError(e, sectionContent),
  );

  return sectionContent;
}
