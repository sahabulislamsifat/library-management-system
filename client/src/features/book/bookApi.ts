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
    getBooks: builder.query<
      {
        data: IBook[];
        total: number;
        page: number;
        limit: number;
      },
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sort?: "asc" | "desc";
        filter?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 8,
        sortBy = "createdAt",
        sort = "desc",
        filter,
      } = {}) => {
        let queryString = `/books?page=${page}&limit=${limit}&sortBy=${sortBy}&sort=${sort}`;
        if (filter) queryString += `&filter=${filter}`;
        return queryString;
      },

      providesTags: (result) =>
        result?.data
          ? [
              // Tag each book individually by ID
              ...result.data.map((book) => ({
                type: "Books" as const,
                id: book._id,
              })),
              // Tag the full list
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    // Get highest copies books
    getHighestCopiesBooks: builder.query<IBook[], void>({
      query: () => "books/highest-copies",
      transformResponse: (response: { data: IBook[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map((book) => ({
                type: "Books" as const,
                id: book._id,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    // Get single book by ID
    getBook: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
      transformResponse: (response: { data: IBook }) => response.data,
    }),

    // Add new book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (newBook) => ({
        url: "books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    // Update existing book
    updateBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    // Delete book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, error, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetHighestCopiesBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
