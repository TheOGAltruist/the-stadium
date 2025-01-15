import { getProductById } from "../../../../server/api/controllers/product.controller";
import { rootApi } from "../api/rootApi";

export const productApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getAllProducts: builder.query({
      query: () => "/products",
    }),

    // Get a product by ID
    getProductById: builder.query({
        query: (id) => `/products/${id}`,
      }),
  
      // Create Product (ADMIN ONLY)
      createProduct: builder.mutation({
        query: (newProduct) => ({
          url: "/products",
          method: "POST",
          body: newProduct,
        }),
      }),
  


  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
