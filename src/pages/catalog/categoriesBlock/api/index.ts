import requestAPI from "../../../../shared/api/APIRootBuilder";

const fetchCategories = () => requestAPI.apiRoot().categories().get().execute();

export default fetchCategories;
