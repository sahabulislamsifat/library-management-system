import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL as BaseURL } from "../../config/baseURL";
import type { IBook } from "../../types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
  }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // Get all books
    getBooks: builder.query<IBook[], void>({
      query: () => "books",
      providesTags: ["Books"],
    }),

    // Get single book by ID
    getBook: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
    }),

    // Add new book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update existing book
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
