import { baseApi } from "@/redux/baseApi";

export const parcelAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Create a new parcel
    createParcel: builder.mutation({
      query: (parcelInfo) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelInfo,
      }),
    }),

    // update parcel details
    editParcel: builder.mutation({
      query: ({ parcelId }) => ({
        url: `/parcel/${parcelId}/cancel`,
        method: "PATCH",
    
      }),
      invalidatesTags: ["PARCEL", "PARCELS"],
    }),

    // Get parcels for the sender
    getMyParcel: builder.query({
      query: (params) => ({
        url: "/parcel/my",
        method: "GET",
        params: params,
      }),
      providesTags: ["PARCEL"],
    }),
 
    // Get all parcels (admin)
    getAllParcel: builder.query({
      query: (params) => ({
        url: "/parcel/all",
        method: "GET",
        params: params,
      }),
      providesTags: ["PARCELS"],
    }),
  }),
});

export const {

  useCreateParcelMutation,
  useGetMyParcelQuery,
  useEditParcelMutation,
  useGetAllParcelQuery,
} = parcelAPi;
