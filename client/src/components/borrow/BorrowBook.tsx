import { useBorrowBookMutation } from "@/features/borrow/borrowApi";
import type { IBook } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useGetBooksQuery } from "@/features/book/bookApi";

interface BorrowDialogProps {
  book: IBook;
}

const BorrowBook = ({ book }: BorrowDialogProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [createBorrow] = useBorrowBookMutation();
  const { refetch } = useGetBooksQuery({ page: 1, limit: 8 });

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!book || quantity < 1 || !dueDate) {
      toast.error("All fields is required");
      return;
    }
    try {
      const borrowData = {
        book: book._id,
        quantity,
        dueDate: dueDate.toISOString(),
      };
      await createBorrow(borrowData).unwrap();
      refetch();
      toast.success("Book borrow successfully!");
      navigate("/borrow-summary");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to book borrow");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[2px] cursor-pointer" variant="outline">
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copies */}
          <div className="space-y-2">
            <Label htmlFor="copies">Quantity </Label>
            <Input
              className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                const num = Number(e.target.value);
                setQuantity(num > 0 ? num : 1);
              }}
              placeholder="Add number of copies"
            />
            {/* Date Picker */}
            <div className="space-y-1">
              <Label className="mb-2">Due Date</Label>
              <Popover>
                <PopoverTrigger
                  className="w-full rounded-none border  px-3 py-2 bg-white/50 dark:bg-neutral-950/50 dark:text-white dark:border-gray-600 focus:ring-purple-500 focus:outline-none"
                  asChild
                >
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate ?? undefined}
                    onSelect={(date: Date | undefined) => {
                      if (date) setDueDate(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="rounded-none cursor-pointer" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="text-sm rounded-[2px] bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 cursor-pointer"
              type="submit"
              onClick={handleSubmit}
            >
              Confirm Borrow
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBook;
