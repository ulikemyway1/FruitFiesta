import requestAPI from "../../../shared/api/APIRootBuilder";

const fetchProductProjections = (queryArgs?: {
  filter?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
}) =>
  requestAPI
    .apiRoot()
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();

const fetchCategories = () => requestAPI.apiRoot().categories().get().execute();

export { fetchProductProjections, fetchCategories };
