import { useState } from "react";
import BookCard from "@/components/book/BookCard";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useGetBooksQuery } from "@/features/book/bookApi";
import type { IBook } from "@/types";

const AllBook = () => {
  const [page, setPage] = useState(1);
  const limit = 8;
  const { data, isLoading, isError } = useGetBooksQuery({
    page,
    limit,
  });

  const books = data?.data || [];
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-5">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-400">
        📚 All Books
      </h2>
      {isError ||
        (books.length === 0 && (
          <p className="text-center text-red-500 mt-10 text-lg">
            Failed to load books or no books available 😢
          </p>
        ))}
      <div className="container mx-auto px-4 py-5">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center mt-10 gap-4">
        <button
          title="Previous Page"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 bg-purple-600 cursor-pointer text-white rounded-[2px] disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 cursor-default  text-purple-700 font-semibold dark:text-purple-400">
          Page {page} of {totalPages}
        </span>

        <button
          title="Next Page"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 bg-purple-600 cursor-pointer text-white rounded-[2px] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBook;
