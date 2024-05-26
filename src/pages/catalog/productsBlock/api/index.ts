import requestAPI from "../../../../shared/api/APIRootBuilder";

// const fetchProductProjections = () =>
//   requestAPI.apiRoot().productProjections().search().get().execute();

// const queryArgs = {
//   filter: 'categories.id: subtree("e7181337-3564-429e-b928-d7a0b9bf6ed5")',
// };

const fetchProductProjections = (queryArgs?: { filter: string }) =>
  requestAPI
    .apiRoot()
    .productProjections()
    .search()
    .get({
      // filter: [`categories.id:"e7181337-3564-429e-b928-d7a0b9bf6ed5"`],
      // filter: 'categories.id: "e7181337-3564-429e-b928-d7a0b9bf6ed5"',
      // "filter.query": 'categories.id: "e7181337-3564-429e-b928-d7a0b9bf6ed5"',
      // "filter.query":
      //   'categories.id: subtree("e7181337-3564-429e-b928-d7a0b9bf6ed5")',

      // queryArgs: {
      //   filter:
      //     'categories.id: subtree("e7181337-3564-429e-b928-d7a0b9bf6ed5")',
      // },

      queryArgs,
    })
    .execute();

export default fetchProductProjections;
