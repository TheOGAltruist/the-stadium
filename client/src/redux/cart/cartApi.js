// cartApi.js
import { rootApi } from "../api/rootApi";

export const cartApi = rootApi.injectEndpoints({
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Fetch cart
    myCartItems: builder.query({
      query: () => "/me/cart",
      providesTags: ["Cart"],
    }),
    // Add cart item
    addCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/me/cart/${productId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    // Remove cart item
    removeCartItem: builder.mutation({
      query: (cartItemId) => ({
        url: `/me/cart/${cartItemId}`,
        method: "DELETE",
      }),
    }),
    // Update cart item
    updateCartItem: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `/me/cart/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
    // Delete cart
    deleteCart: builder.mutation({
      query: () => ({
        url: "/me/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useMyCartItemsQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartMutation,
} = cartApi;
