import { getProductById } from "../../../../server/api/controllers/product.controller";
import { rootApi } from "../api/rootApi";

export const productApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getAllProducts: builder.query({
      query: () => "/products",
    }),



  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
