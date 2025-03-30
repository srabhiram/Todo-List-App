import { useAppContext } from "@/app/context/userContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { NotebookPenIcon } from "lucide-react";
import { useState } from "react";

const AddNoteDialog = ({
  todoId,
  userId,
}: {
  todoId: string;
  userId: string;
}) => {
  const [note, setNote] = useState<string>(""); // ✅ Use string instead of array
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { fetchTodos } = useAppContext();

  const handleNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return; // ✅ Prevent empty note submission
    setLoading(true);
    try {
      await axios.put(
        "/api/todo/edit", // ✅ Ensure this matches your backend route
        { formData: { note } }, // ✅ Send note correctly
        { params: { todoId } } // ✅ Pass todoId as query param
      );

      fetchTodos(userId); // ✅ Refresh todo list after update
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="px-2 py-1 hover:bg-black/20 rounded-full cursor-pointer">
          <NotebookPenIcon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Note to ToDo</DialogTitle>
          <DialogDescription>
            Enter a note for this ToDo and click &quot;Add Note&quot; to save.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col gap-3">
            <form onSubmit={handleNote}>
              <Label htmlFor="note" className="text-lg">
                Note
              </Label>
              <Input
                id="note"
                value={note} // ✅ Controlled input
                onChange={(e) => setNote(e.target.value)} // ✅ Update state
                placeholder="Write your note here..."
              />
            </form>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" disabled={loading}>
            {loading ? "Adding Note..." : "Add Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
