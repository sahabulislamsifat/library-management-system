import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBorrow, IBorrowSummary } from "../../types";
import { Base_URL } from "../../config/baseURL";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: Base_URL,
  }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    // Create a borrow record
    borrowBook: builder.mutation<IBorrow, Partial<IBorrow>>({
      query: (borrowData) => ({
        url: "borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrow"],
    }),

    // Get borrow summary (aggregated)
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "borrow-summary",
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
