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
import { Button } from "../ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IDeleteDialogProps {
  onDelete: () => void;
}

const BookDeleteModal = ({ onDelete }: IDeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className=" hover:text-red-600 text-red-600 border border-red-500"
          variant="outline"
        >
          <RiDeleteBin6Line />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? you want to delete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-900 hover:bg-red-900 text-white"
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
