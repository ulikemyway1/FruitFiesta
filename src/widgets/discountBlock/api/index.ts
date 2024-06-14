import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchDiscountCodes = () =>
  requestAPI.apiRoot().discountCodes().get().execute();

// const fetchProductDiscounts = () =>
//   requestAPI.apiRoot().productDiscounts().get().execute();

// only active product discounts are fetched
const fetchProductDiscounts = () =>
  requestAPI
    .apiRoot()
    .productDiscounts()
    .get({
      queryArgs: {
        where: "isActive = true",
      },
    })
    .execute();

export { fetchDiscountCodes, fetchProductDiscounts };
