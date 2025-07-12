import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateBookMutation } from "@/features/book/bookApi";
import type { EditBookFormData, IBook } from "@/types";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Pencil } from "lucide-react";

const genres = ["Fiction", "Non‑Fiction", "Science", "Biography", "Drama"];

const genreMap: Record<string, string> = {
  Fiction: "FICTION",
  "Non‑Fiction": "NON_FICTION",
  Science: "SCIENCE",
  Biography: "BIOGRAPHY",
  Drama: "FANTASY",
};

interface EditBookProps {
  book: IBook;
}

const EditBookModal = ({ book }: EditBookProps) => {
  const [open, setOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditBookFormData>({
    defaultValues: {
      title: book.title,
      author: book.author,
      image: book.image,
      genre:
        Object.keys(genreMap).find((key) => genreMap[key] === book.genre) || "",
      isbn: book.isbn,
      description: book.description,
      copies: book.copies,
    },
  });

  if (!book._id) {
    toast.error("Book ID not found!");
    return;
  }

  const onSubmit = async (data: EditBookFormData) => {
    try {
      const updated = {
        ...data,
        genre: genreMap[data.genre] as IBook["genre"],
      };
      console.log("Sending update payload:", updated);
      console.log("Book ID:", book._id);

      await updateBook({ id: book._id!, data: updated }).unwrap();

      toast.success("📘 Book updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update book 😥");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          className="text-yellow-600 rounded-none cursor-pointer hover:text-yellow-700"
          size={18}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-none bg-white/95 dark:bg-neutral-950/95 dark:text-white dark:border-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-sm text-red-500">{errors.author.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Image</Label>
              <Input
                className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Genre</Label>
              <select
                {...register("genre", { required: "Genre is required" })}
                className="w-full border px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
              >
                <option value="">Select genre...</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <p className="text-sm text-red-500">{errors.genre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>ISBN</Label>
              <Input
                className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                {...register("isbn", { required: "ISBN is required" })}
              />
              {errors.isbn && (
                <p className="text-sm text-red-500">{errors.isbn.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Copies</Label>
              <Input
                className="w-24 border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white rounded-none cursor-pointer dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                type="number"
                min={1}
                {...register("copies", {
                  required: "Copies is required",
                  valueAsNumber: true,
                })}
              />
              {errors.copies && (
                <p className="text-sm text-red-500">{errors.copies.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="rounded-none cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 cursor-pointer rounded-none text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
