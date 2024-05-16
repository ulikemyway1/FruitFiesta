import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchDiscountCodes = () =>
  requestAPI.withAnonymousSessionFlow().discountCodes().get().execute();

export default fetchDiscountCodes;
