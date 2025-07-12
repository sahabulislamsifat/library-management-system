import type { IBook } from "@/types";
import { Eye } from "lucide-react";
import { Link } from "react-router";
import BorrowBook from "../borrow/BorrowBook";
import EditBookModal from "./EditBookModal";
import BookDeleteModal from "./BookDeleteModal";
import { useDeleteBookMutation } from "@/features/book/bookApi";
import toast from "react-hot-toast";

const BookCard = ({ book }: { book: IBook }) => {
  const [deleteBook] = useDeleteBookMutation();
  console.log("BookCard", book);

  const handleDelete = async () => {
    try {
      await deleteBook(book._id!);
      toast.success("Book Deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Book Deleted failed!");
    }
  };

  return (
    <div className="w-80  dark:from-gray-800 dark:to-gray-950 p-4 rounded shadow-md hover:shadow-xl transition duration-300 border dark:border-gray-700">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden rounded mb-4">
        <img
          src={
            book.image || "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">
          {book.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Author:</span> {book.author}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Genre:</span>{" "}
          {book.genre.replace("_", " ")}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">ISBN:</span> {book.isbn}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Copies:</span> {book.copies}
        </p>
        {book.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {book.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* Borrow Book */}
        <BorrowBook book={book}></BorrowBook>

        <div className="flex gap-2 items-center">
          {/* View Details */}
          <Link
            title="View Details"
            to={`/book/${book._id}`}
            className="text-purple-700 dark:text-purple-300 hover:text-purple-900 cursor-pointer dark:hover:text-white"
          >
            <Eye size={18} />
          </Link>

          {/* Edit Option  */}
          <EditBookModal book={book}></EditBookModal>

          {/* Delete Option */}
          <BookDeleteModal onDelete={handleDelete}></BookDeleteModal>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
