import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchProductProjections = () =>
  requestAPI.apiRoot().productProjections().get().execute();

export default fetchProductProjections;
