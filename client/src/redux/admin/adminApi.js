import { rootApi } from "../api/rootApi";

export const adminApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Product-related endpoints
    // Create Product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
    }),
    // Update products
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updatedProduct,
      }),
    }),
    //   Delete products
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),

    //   User-related endpoints
    // Get all users
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    // Get a specific user by ID
    getSpecificUser: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    // Modify user by ID
    modifySpecificUser: builder.mutation({
      query: ({ userId, ...patch }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    // Order-related endpoints
    // Get all orders
    getAllOrders: builder.query({
        query: () => '/orders',
    }),
    
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllUsersQuery,
  useGetSpecificUserQuery,
  useModifySpecificUserMutation,
} = adminApi;
