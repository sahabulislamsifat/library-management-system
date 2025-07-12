import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IDeleteDialogProps {
  onDelete: () => void;
}

const BookDeleteModal = ({ onDelete }: IDeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button
          className=" hover:text-red-600 text-red-600 rounded-none border-none cursor-pointer"
          variant="outline"
        >
        </Button> */}
        <RiDeleteBin6Line
          className=" hover:text-red-600 text-red-600 rounded-none border-none cursor-pointer"
          size={18}
          title="Delete Book"
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg rounded-none bg-white/80 dark:bg-neutral-950/80 dark:text-white dark:border-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? you want to delete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 cursor-pointer hover:bg-red-800 rounded-none text-white"
            onClick={onDelete}
          >
            {" "}
            Yes, delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookDeleteModal;
