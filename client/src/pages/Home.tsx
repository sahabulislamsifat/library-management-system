import Banner from "@/components/banner/Banner";
import BookCard from "@/components/book/BookCard";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useGetHighestCopiesBooksQuery } from "@/features/book/bookApi";
import type { IBook } from "@/types";
import { Link } from "react-router";

const Home = () => {
  const { data: books, isLoading, isError } = useGetHighestCopiesBooksQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !books?.length) {
    return (
      <p className="text-center text-red-500 mt-10 text-lg">
        Failed to load books or no books available 😢
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* Banner */}
      <Banner />

      {/* Book Section */}
      <section className="container mx-auto px-4 py-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-purple-700 dark:text-purple-400 text-center sm:text-left">
          Highest Copies Books
        </h1>

        <div className="w-full px-4 py-10 max-w-[1400px] mx-auto">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books?.map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center sm:justify-end">
          <Link
            to="/books"
            title="See more books"
            className="text-purple-600 hover:underline font-medium text-base sm:text-lg"
          >
            See more...
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
