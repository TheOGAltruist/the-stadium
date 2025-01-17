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

 
  }),
});

export const { useGetMeQuery, useEditMeMutation } = userApi;
