import { rootApi } from "../api/rootApi";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    // PROFILE-related endpoints
    // Get Me profile
    getMe: builder.query({
      query: () => "/me",
    }),
    // Edit Me
    editMe: builder.mutation({
      query: (userData) => ({
        url: "/me",
        method: "PATCH",
        body: userData,
      }),
    }),

    // ORDER-related endpoints
    // Create a new order
    newOrder: builder.mutation({
      query: (orderData) => ({
        url: "/me/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    // Fetch orders
    myOrders: builder.query({
      query: () => "/me/orders",
    }),

    // CART-RELATED endpoints
    // Fetch cart
    myCartItems: builder.query({
      query: () => "/me/cart",
    }),
    // Add cart item
    addCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/me/cart/${productId}`,
        method: "POST",
        body: { quantity },
      }),
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
    }),

    // PAYMENT-related endpoints
    // Get payment methods
    getPaymentMethods: builder.query({
      query: () => "/me/payments",
    }),
    // Add payment method
    addPaymentMethod: builder.mutation({
      query: (paymentMethodData) => ({
        url: "/me/payments",
        method: "POST",
        body: paymentMethodData,
      }),
    }),
    // Add payment method details
    addPaymentMethodDetails: builder.mutation({
      query: ({ paymentMethodId, details }) => ({
        url: `/me/payments/${paymentMethodId}`,
        method: "POST",
        body: details,
      }),
    }),
    // Delete payment method
    deletePaymentMethod: builder.mutation({
      query: (paymentMethodId) => ({
        url: `/me/payments/${paymentMethodId}`,
        method: "DELETE",
      }),
    }),

    // WISHLIST-related endpoints
    // Create a new wishlist
    newWishlist: builder.mutation({
      query: (wishlistData) => ({
        url: "/me/wishlists",
        method: "POST",
        body: wishlistData,
      }),
    }),
    // Fetch wishlists
    myWishlists: builder.query({
      query: () => "/me/wishlists",
    }),
    // Add wishlist item
    addWishlistItem: builder.mutation({
      query: ({ wishlistId, productId }) => ({
        url: `/me/wishlists/${wishlistId}/${productId}`,
        method: "POST",
      }),
    }),
    // Remove wishlist item
    removeWishlistItem: builder.mutation({
      query: ({ wishlistId, wishlistItemId }) => ({
        url: `/me/wishlists/${wishlistId}/${wishlistItemId}`,
        method: "DELETE",
      }),
    }),
    // Delete wishlist
    deleteWishlist: builder.mutation({
      query: (wishlistId) => ({
        url: `/me/wishlists/${wishlistId}`,
        method: "DELETE",
      }),
    }),
    // Share a wishlist
    shareWishlist: builder.mutation({
      query: ({ wishlistId, data }) => ({
        url: `/me/wishlists/${wishlistId}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useEditMeMutation,
  useNewOrderMutation,
  useMyOrdersQuery,
  useMyCartItemsQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartMutation,
  useNewWishlistMutation,
  useMyWishlistsQuery,
  useAddWishlistItemMutation,
  useRemoveWishlistItemMutation,
  useDeleteWishlistMutation,
  useShareWishlistMutation,
  useGetPaymentMethodsQuery,
  useAddPaymentMethodDetailsMutation,
  useAddPaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = userApi;
