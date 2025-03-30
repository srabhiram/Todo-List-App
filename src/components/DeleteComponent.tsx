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
} from "@/components/ui/alert-dialog";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";

const DeleteComponent = ({
  todoId,
  handleTodoDelete,
}: {
  todoId: string;
  handleTodoDelete: (todo_id: string) => Promise<void>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors">
          <FaTrash className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaExclamationTriangle className="text-red-600" /> Confirm Delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            Are you sure you want to delete this todo? This action cannot be
            undone, and the todo will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
          <AlertDialogCancel className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleTodoDelete(todoId)}
            className="bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2 flex items-center gap-2 transition-colors"
          >
            <FaTrash /> Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComponent;
