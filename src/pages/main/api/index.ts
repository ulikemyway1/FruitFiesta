import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchDiscountCodes = () =>
  requestAPI.withAnonymousSessionFlow().discountCodes().get().execute();

const fetchProductProjections = () =>
  apiRoot.productProjections().get().execute();

export { fetchDiscountCodes, fetchProductProjections };
