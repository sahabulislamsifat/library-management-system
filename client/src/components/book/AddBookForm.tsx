import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddBookMutation } from "@/features/book/bookApi";

type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

type FormData = {
  title: string;
  author: string;
  image: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
};

// Map form genre to backend enum values
const genreMap: Record<string, Genre> = {
  Fiction: "FICTION",
  "Non‑Fiction": "NON_FICTION",
  Science: "SCIENCE",
  Biography: "BIOGRAPHY",
  Drama: "FANTASY",
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
      const payload = {
        ...data,
        genre: genreMap[data.genre],
      };
      await addBook(payload).unwrap();
      // console.log("Book added successfully:", payload);
      toast.success("📚 Book added successfully!");
      reset();
      navigate("/books");
    } catch {
      toast.error("Failed to add book 😥");
    }
  };

  return (
    <div className="bg-white/50 dark:bg-neutral-950/50 min-h-screen">
      <div className="max-w-lg mx-auto px-4 py-12 ">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700 dark:text-purple-400">
          Add New Book
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/50 dark:bg-neutral-950/50 border border-slate-100 dark:border-slate-700 p-6 space-y-5 shadow-sm"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter book title..."
              {...register("title", { required: "Title is required" })}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Author's name"
              {...register("author", { required: "Author is required" })}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="drop image URL here"
              {...register("image", { required: "Image is required" })}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium mb-1 bg-white/50 dark:bg-neutral-950/50 dark:text-gray-200">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              {...register("genre", { required: "Genre is required" })}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select genre...</option>
              {genres.map((g) => (
                <option
                  className="bg-white/50 dark:bg-neutral-950/50 dark:text-white"
                  key={g}
                  value={g}
                >
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              ISBN <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="ISBN number"
              {...register("isbn", { required: "ISBN is required" })}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            {errors.isbn && (
              <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Description
            </label>
            <textarea
              placeholder="Write a brief description of the book..."
              {...register("description")}
              rows={4}
              className="w-full border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Copies */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Copies <span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={1}
              type="number"
              min={1}
              {...register("copies", {
                required: "Copies is required",
                valueAsNumber: true,
                min: { value: 1, message: "At least 1 copy is required" },
              })}
              className="w-24 border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
            />
            {errors.copies && (
              <p className="text-red-500 text-sm mt-1">
                {errors.copies.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3  transition"
            >
              {isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
