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
import { useState } from "react";
import { FaStickyNote, FaSave, FaSpinner } from "react-icons/fa";

const AddNoteDialog = ({
  todoId,
  userId,
}: {
  todoId: string;
  userId: string;
}) => {

  const [note, setNote] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { fetchTodos } = useAppContext();

  // Handle form submission
  const handleNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return; // Prevent empty note submission
    setLoading(true);
    try {
      await axios.put(
        "/api/todo/edit",
        { formData: { note: [note] } }, // Send note as an array to match TodoType
        { params: { todoId } }
      );
      fetchTodos(userId);
      setNote(""); 
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
        <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
          <FaStickyNote className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaStickyNote className="text-indigo-600" /> Add a Note
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a note to this todo item. It will be saved with the existing notes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNote} className="py-4 space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="note" className="text-sm font-medium text-gray-700">
              Note
            </Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 transition-colors"
              disabled={loading || !note.trim()}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Adding Note...
                </>
              ) : (
                <>
                  <FaSave /> Add Note
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;