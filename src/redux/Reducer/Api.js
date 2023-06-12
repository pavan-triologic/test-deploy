import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiList, BASE_URL, company_code } from "../../Api/ApiList";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: ({ companyCode }) => ApiList.setting + "?company_code=" + companyCode,
    }),
    getProduct: builder.query({
      query: ({
        sort,
        page,
        data,
        mode,
        catalogue_id,
        user_id,
        cat_id,
        table,
      }) =>
        ApiList.products +
        `?mode=${mode ? mode : "catalogue_filter"}&data=${data}&catalogue_id=${catalogue_id ? catalogue_id : 31
        }&user_id=${user_id ? user_id : 1182}&cat_id=${cat_id ? cat_id : 0
        }&company_code=${company_code}&page=${page}&sort=${sort ? sort : 0
        }&table=${table ? table : "design_master"}`,
    }),
    getSort: builder.query({
      query: ({ companyCode }) =>
        ApiList.sortParams + `?user_id=1182&company_code=${companyCode}`,
    }),
    getProductCount: builder.query({
      query: () =>
        ApiList.productMatrixCount +
        `?mode=catalogue_filter&catalogue_id=31&user_id=1182&cat_id=0&company_code=${company_code}&table=design_master`,
    }),
    getFilterData: builder.query({
      query: () =>
        ApiList.fetchParams +
        `?collection_id=&mode=my_catalogue&catalogue_id=31&user_id=1182&cat_id=0&company_code=${company_code}&design_status=1&table=design_master`,
    }),
    getFilterProductCount: builder.query({
      query:
        ApiList.productMatrixCount +
        `?mode=catalogue_filter&max_gross_wt=5.000&catalogue_id=31&user_id=1182&cat_id=0&session_id=&company_code=${company_code}&sort=0&design_status=1&min_gross_wt=3.070&table=design_master`,
    }),
  }),
});

export const {
  useGetSettingQuery,
  useGetProductQuery,
  useGetSortQuery,
  useGetProductCountQuery,
  useGetFilterDataQuery,
  useGetFilterProductCountQuery,
} = api;
export default api;
