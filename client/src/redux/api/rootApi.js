import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      // Get the token from cookies saved from backend
      headers.set("Content-type", "application/json");
    },
    // need to set this to "include" for cookies to work
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
