import type { IBook } from "@/types";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import BorrowBook from "../borrow/BorrowBook";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <div className="w-80 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-800 dark:to-gray-950 p-4 rounded shadow-md hover:shadow-xl transition duration-300 border dark:border-gray-700">
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
        <BorrowBook book={book}></BorrowBook>

        <div className="flex gap-2 items-center">
          <Link
            to={`/book/${book._id}`}
            className="text-purple-700 dark:text-purple-300 hover:text-purple-900 cursor-pointer dark:hover:text-white"
          >
            <Eye size={18} />
          </Link>
          <Link
            to="/"
            className="text-yellow-600 cursor-pointer hover:text-yellow-700"
          >
            <Pencil size={18} />
          </Link>
          <Link
            to="/"
            className="text-red-600 hover:text-red-700 cursor-pointer"
          >
            <Trash2 size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
