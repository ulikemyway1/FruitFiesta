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
    props?: { cssClasses?: string[]; editable?: boolean },
  ): void {
    this.view.addSection(sectionName, sectionContent, props);
  }
}
