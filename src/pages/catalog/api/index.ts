import requestAPI from "../../../shared/api/APIRootBuilder";
// import { ByProjectKeyProductProjectionsSearchRequestBuilder } from "@commercetools/platform-sdk";
// get(methodArgs?: {
//   queryArgs?: {
//       fuzzy?: boolean;
//       fuzzyLevel?: number;
//       markMatchingVariants?: boolean;
//       filter?: string | string[];
//       'filter.facets'?: string | string[];
//       'filter.query'?: string | string[];
//       facet?: string | string[];
//       sort?: string | string[];
//       limit?: number;
//       offset?: number;
//       withTotal?: boolean;
//       staged?: boolean;
//       priceCurrency?: string;
//       priceCountry?: string;
//       priceCustomerGroup?: string;
//       priceChannel?: string;
//       localeProjection?: string | string[];
//       storeProjection?: string;
//       expand?: string | string[];
//       [key: string]: QueryParam;
//   };
//   headers?: {
//       [key: string]: string | string[];
//   };
// }): ApiRequest<ProductProjectionPagedSearchResponse>;

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

const fetchCategories = () => requestAPI.apiRoot().categories().get().execute();

export { fetchProductProjections, fetchCategories };
