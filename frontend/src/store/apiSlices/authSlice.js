import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_Url } from "/src/store/apiSlices/BaseUrl.js";
import Cookies from 'js-cookie';


const setToken = (token) => {
    return Cookies.set("token", token, { expires: 1 });
}
export const authSlice = createApi({
    // setup
    reducerPath: "authSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: base_Url
    }),
    tagTypes: ["auth"],
    endpoints: (builder) => ({
        // SignUP
        signUp: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["auth"]
        }),
        // SignIn 
        signIn: builder.mutation({
            query: (existuser) => ({
                url: "/login",
                method: "POST",
                body: existuser
            }),
            onQueryStarted: async(arg, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled
                    console.log(result)
                    setToken(result.data.token);
                } catch (error) {
                    console.log("login ka error ayaa ka jiro ", error)
                }
            },
            invalidatesTags: ["auth"]
        })

    }),
})

export const { useSignUpMutation, useSignInMutation } = authSlice;
export default authSlice.reducer