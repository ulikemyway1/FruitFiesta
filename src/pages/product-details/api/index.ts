import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchProductByProductKey = (key: string) =>
  requestAPI.apiRoot().productProjections().withKey({ key }).get().execute();

export default fetchProductByProductKey;
