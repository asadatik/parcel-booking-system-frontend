import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
profileUpdate: builder.mutation({
  query: ({ id, data }) => ({
    url: `/user/${id}`,
    method: "PATCH",
    data, // সরাসরি object পাঠানো হচ্ছে
  }),
  invalidatesTags: ["USER", "USERS"],
}),


    //
    passwordUpdate: builder.mutation({
      query: (updatedData) => ({
        url: "/auth/change-password",
        method: "POST",
        data: updatedData,
      }),
      invalidatesTags: ["USER"],
    }),

    //
    getAllReceiver: builder.query({
      query: () => ({
        url: "/user/all-receiver",
        method: "GET",
      }),
    }),

    
    //
  getAllUser: builder.query({
  query: ({ page = 1, limit = 10 }) => ({
    url: `/user/all-users?page=${page}&limit=${limit}`,
    method: "GET",
  }),
  providesTags: ["USERS"],
}),

  
  }),
});

export const {
  useProfileUpdateMutation,
  usePasswordUpdateMutation,
  useGetAllReceiverQuery,
  useGetAllUserQuery,
 
} = userApi;
