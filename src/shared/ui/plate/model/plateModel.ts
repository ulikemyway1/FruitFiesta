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
};

export type PlateSectionContentWrapper = {
  [sesctionSubTile: string]: SectionContent;
};

export type SectionContent = {
  sesctionSubTile: string;
  content: HTMLInputElement;
};
