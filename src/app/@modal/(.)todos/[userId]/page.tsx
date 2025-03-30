"use client";
import { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";

export default function TodoModal() {
  const searchParams = useSearchParams();
  const  todoId  = searchParams.get("todoId");
  const [todo, setTodo] = useState<{
    title: string;
    description: string;
    priority: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      try {
        const res = await axios.get(`/api/todo/${todoId}`);
        setTodo(res.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodoDetails();
  }, [todoId]);

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{todo?.title || "Loading..."}</DialogTitle>
          <DialogDescription>
            {todo?.description || "No description available"}
          </DialogDescription>
          <p className="mt-2 text-sm text-gray-500">
            Priority:{" "}
            <span
              className={`font-semibold ${
                todo?.priority === "high"
                  ? "text-red-500"
                  : todo?.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {todo?.priority}
            </span>
          </p>
          <p className="text-xs text-gray-400">
            Created{" "}
            {todo?.createdAt && new Date(todo.createdAt).toLocaleString()}
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
