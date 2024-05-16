import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchDiscountCodes = () =>
  requestAPI.withAnonymousSessionFlow().discountCodes().get().execute();

const fetchProductProjections = () =>
  requestAPI.withAnonymousSessionFlow().productProjections().get().execute();

export { fetchDiscountCodes, fetchProductProjections };
