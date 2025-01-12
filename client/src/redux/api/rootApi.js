import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        console.log("Token found:", token);
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.log("No token found in localStorage");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});
