import { rootApi } from "../api/rootApi";

export const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get Me profile
        getMe: builder.query({
            query: () => '/me',
        }),
        // Edit Me
        editMe: builder.mutation({
            query: (userData) => ({
                url: '/me',
                method: 'PATCH',
                body: userData,
            }),
        }),


    }),
});

export const { useGetMeQuery, useEditMeMutation } = userApi;