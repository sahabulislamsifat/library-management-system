import Banner from "@/components/banner/Banner";
import BookCard from "@/components/book/BookCard";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { useGetBooksQuery } from "@/features/book/bookApi";
import type { IBook } from "@/types";

const Home = () => {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError || !books?.length) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load books or no books available 😢
      </p>
    );
  }

  return (
    <div>
      {/* Banner Component: */}
      <Banner></Banner>
      {/* Additional content can be added here */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-medium mb-6 text-purple-700 dark:text-purple-400">
          Highest Copies Books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books?.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
