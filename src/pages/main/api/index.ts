import apiRoot from "../../../shared/api/APIRoot";

const fetchDiscountCodes = () => apiRoot.discountCodes().get().execute();

const fetchProductProjections = () =>
  apiRoot.productProjections().get().execute();

export { fetchDiscountCodes, fetchProductProjections };

// fetchProductProjections().then(({ body: { count, results } }) => {
//   for (let i = 0; i < 3; i += 1) {
//     const randomProduct = results[Math.floor(Math.random() * count)];
//     console.log(randomProduct);
//   }
// });

// apiRoot
//   .productProjections()
//   .search()
//   .get({
//     queryArgs: {
//       limit: 2,
//       offset: 2,
//     },
//   })
//   .execute();
