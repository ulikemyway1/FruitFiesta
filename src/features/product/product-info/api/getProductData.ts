import requestAPI from "../../../../shared/api/APIRootBuilder";

export default function getProductData(key: string): void {
  requestAPI.apiRoot().productProjections().withKey({ key }).get().execute();
}
