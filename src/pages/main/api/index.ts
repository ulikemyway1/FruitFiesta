import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchDiscountCodes = () => requestAPI.apiRoot().discountCodes().get().execute();

export default fetchDiscountCodes;
