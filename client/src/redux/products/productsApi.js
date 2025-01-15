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

 
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = productApi;
