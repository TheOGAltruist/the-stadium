import { rootApi } from "../api/rootApi";

export const adminApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // ***PRODUCT-RELATED ENDPOINTS***
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

    //   ***USER-RELATED ENDPOINTS***
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

    // ***ORDER-RELATED ENDPOINTS***
    // Get all orders
    getAllOrders: builder.query({
      query: () => "/orders",
    }),
    // Change Order Status
    changeOrderStatus: builder.mutation({
      query: ({ orderId, ...patch }) => ({
        url: `/orders/${orderId}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    // ***TAG-RELATED ENDPOINTS***
    // Create a new tag
    createNewTag: builder.mutation({
        query: (newTag) => ({
            url: '/tags',
            method: 'POST',
            body: newTag,
        }),
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
  useGetAllOrdersQuery,
  useChangeOrderStatusMutation,
} = adminApi;
