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
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    // Fetch orders
    myOrders: builder.query({
      query: () => "/orders",
    }),

    // CART-RELATED endpoints
    // Fetch cart
    myCartItems: builder.query({
      query: () => "/cart",
    }),
    // Add cart item
    addCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/${productId}`,
        method: "POST",
        body: { quantity },
      }),
    }),
    // Remove cart item
    removeCartItem: builder.mutation({
      query: (cartItemId) => ({
        url: `/cart/${cartItemId}`,
        method: "DELETE",
      }),
    }),
    // Update cart item
    updateCartItem: builder.mutation({
      query: ({ cartItemId, quantity }) => ({
        url: `/cart/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
    // Delete cart
    deleteCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
    }),

    
  }),
});

export const { useGetMeQuery, useEditMeMutation } = userApi;
