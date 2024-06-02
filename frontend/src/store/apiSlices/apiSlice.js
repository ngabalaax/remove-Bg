import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_Url } from "/src/store/apiSlices/BaseUrl.js";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: base_Url }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    updateSettings: builder.mutation({
      query: (settings) => ({
        url: '/settings',
        method: 'POST',
        body: settings,
      }),
    }),
  //   registerUser: builder.mutation({
  //     query: (newUser) => ({
  //         url: "/register",
  //         method: "POST",
  //         body: newUser,
  //     }),
  //     invalidatesTags: ["auth"]
  // }),
  //   loginUser: builder.mutation({
  //     query: (credentials) => ({
  //       url: '/login',
  //       method: 'POST',
  //       body: credentials,
  //     }),
  //   }),
  }),
});

// Import hooks from @reduxjs/toolkit/query/react
export const {
  useUploadFileMutation,
  useUpdateSettingsMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
} = apiSlice;

export default apiSlice.reducer;
