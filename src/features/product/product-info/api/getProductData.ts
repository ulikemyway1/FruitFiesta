import requestAPI from "../../../../shared/api/APIRootBuilder";

export default function getProductData(key: string) {
  return requestAPI
    .apiRoot()
    .productProjections()
    .withKey({ key })
    .get()
    .execute();
}
