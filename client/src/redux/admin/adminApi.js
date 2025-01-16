import { rootApi } from "../api/rootApi";

export const adminApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // ***PRODUCT-RELATED ENDPOINTS***
    // Create Product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/admin/products",
        method: "POST",
        body: newProduct,
      }),
    }),
    // Update products
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/admin/products/${id}`,
        method: "PATCH",
        body: updatedProduct,
      }),
    }),
    //   Delete products
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
    }),

    //   ***USER-RELATED ENDPOINTS***
    // Get all users
    getAllUsers: builder.query({
      query: () => "/admin/users",
    }),
    // Get a specific user by ID
    getSpecificUser: builder.query({
      query: (userId) => `/admin/users/${userId}`,
    }),
    // Modify user by ID
    modifySpecificUser: builder.mutation({
      query: ({ userId, ...patch }) => ({
        url: `/admin/users/${userId}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    // ***ORDER-RELATED ENDPOINTS***
    // Get all orders
    getAllOrders: builder.query({
      query: () => "/admin/orders",
    }),
    // Change Order Status
    changeOrderStatus: builder.mutation({
      query: ({ orderId, ...patch }) => ({
        url: `/admin/orders/${orderId}`,
        method: "PATCH",
        body: patch,
      }),
    }),

    // ***TAG-RELATED ENDPOINTS***
    // Create a new tag
    createNewTag: builder.mutation({
      query: (newTag) => ({
        url: "/admin/tags",
        method: "POST",
        body: newTag,
      }),
    }),
    // Delete/Remove a tag
    deleteTag: builder.mutation({
      query: (tagId) => ({
        url: `/admin/tags/${tagId}`,
        method: "DELETE",
      }),
    }),

    // ***CATEGORY-RELATED ENDPOINTS***
    // Create a new category
    createNewCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/admin/categories",
        method: "POST",
        body: newCategory,
      }),
    }),
    // Delete/remove category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/categories/${categoryId}`,
        method: "DELETE",
      }),
    }),

    // ***WISHLIST-RELATED ENDPOINTS***
    // Get all wishlists
    getAllWishlists: builder.query({
      query: () => "/admin/wishlists",
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
  useCreateNewTagMutation,
  useDeleteTagMutation,
  useCreateNewCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllWishlistsQuery,
} = adminApi;
