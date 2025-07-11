import { useParams } from "react-router-dom";
import { useGetBookQuery } from "@/features/book/bookApi";
import { Loader2 } from "lucide-react";
import BorrowBook from "../borrow/BorrowBook";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookQuery(id as string);
  // console.log(data);
  const bookData = data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-purple-600" />
        <span className="ml-2 text-purple-600">Loading book details...</span>
      </div>
    );
  }

  if (isError || !bookData) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load book details.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/50 dark:bg-neutral-950/50 p-6 rounded-none shadow-md border dark:border-gray-800">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Book Image */}
          <div className="w-full h-80 overflow-hidden rounded border dark:border-gray-800">
            <img
              src={
                bookData?.image ||
                "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={bookData?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
              {bookData?.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Author:</span> {bookData?.author}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Genre:</span>{" "}
              {bookData?.genre ? bookData?.genre.replace("_", " ") : "N/A"}
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">ISBN:</span> {bookData?.isbn}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Total Copies:</span>{" "}
              {bookData?.copies}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Available:</span>{" "}
              {bookData?.available ? "Yes" : "No"}
            </p>
            {bookData?.description && (
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Description:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {bookData?.description}
                </p>
              </div>
            )}
            <BorrowBook book={bookData}></BorrowBook>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
