import apiRoot from "../../../shared/api/APIRoot";

const fetchDiscountCodes = () => apiRoot.discountCodes().get().execute();

export default fetchDiscountCodes;
