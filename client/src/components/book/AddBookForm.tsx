import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddBookMutation } from "@/features/book/bookApi";

type FormData = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
};

const genres = ["Fiction", "Non‑Fiction", "Science", "Biography", "Drama"];

const AddBookForm = () => {
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addBook(data).unwrap();
      toast.success("📚 Book added successfully!");
      reset();
      navigate("/books");
    } catch {
      toast.error("Failed to add book 😥");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-purple-700 dark:text-purple-400">
        Add New Book
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 border border-slate-100 dark:border-slate-700 p-6 rounded-lg space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            {...register("author", { required: "Author is required" })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Genre <span className="text-red-500">*</span>
          </label>
          <select
            {...register("genre", { required: "Genre is required" })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">Select genre...</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            {...register("isbn", { required: "ISBN is required" })}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        {/* Description (Optional) */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        {/* Copies */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-200">
            Copies <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={1}
            {...register("copies", {
              required: "Copies is required",
              valueAsNumber: true,
              min: { value: 1, message: "At least 1 copy is required" },
            })}
            className="w-24 border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
          />
          {errors.copies && (
            <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded transition"
          >
            {isSubmitting ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
