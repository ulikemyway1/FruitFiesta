import apiRoot from "../../../shared/api/APIRoot";

const fetchDiscountCodes = () => apiRoot.discountCodes().get().execute();

const fetchProductProjections = () =>
  apiRoot.productProjections().get().execute();

export { fetchDiscountCodes, fetchProductProjections };
