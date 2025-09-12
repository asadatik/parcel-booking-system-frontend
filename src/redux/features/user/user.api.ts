import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //
    profileUpdate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: formData,
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
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["USERS"],
    }),
    // getAdminStats: builder.query({
    //   query: () => ({
    //     url: "/stats/user",
    //     method: "GET",
    //   }),
    //   providesTags: ["ADMIN_STATS"],
    // }),
  }),
});

export const {
  useProfileUpdateMutation,
  usePasswordUpdateMutation,
  useGetAllReceiverQuery,
  useGetAllUserQuery,
  // useGetAdminStatsQuery,
} = userApi;
