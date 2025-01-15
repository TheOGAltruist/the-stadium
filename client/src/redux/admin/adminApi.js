import { rootApi } from "../api/rootApi";

export const adminApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
   // Create Product (ADMIN ONLY)
   createProduct: builder.mutation({
    query: (newProduct) => ({
      url: "/products",
      method: "POST",
      body: newProduct,
    }),
  }),

  // Update products (ADMIN ONLY)
  updateProduct: builder.mutation({
    query: ({ id, ...updatedProduct }) => ({
      url: `/products/${id}`,
      method: "PUT",
      body: updatedProduct,
    }),
  }),

  //   Delete products (ADMIN ONLY)
  deleteProduct: builder.mutation({
    query: (id) => ({
      url: `/products/${id}`,
      method: "DELETE",
    }),
  }),
}),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminApi;