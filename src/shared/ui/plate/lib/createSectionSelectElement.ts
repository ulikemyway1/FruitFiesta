import CreateElement from "../../../helpers/element-create";
import { CountryOptions } from "../../../lib/address/list/countries";
import { SectionContent } from "../model/plateModel";

export default function createSectionSelectElement(
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
