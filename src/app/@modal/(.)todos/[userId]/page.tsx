"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaTag,
  FaUser,
  FaStickyNote,
  FaExclamationCircle,
} from "react-icons/fa";
import { timeAgo } from "@/helpers/timeago";
import { TodoType } from "@/app/context/userContext";

export default function TodoModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const todoId = searchParams.get("todoId");

  const [todo, setTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    const fetchTodoDetails = async () => {
      if (!todoId) return;
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
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            {todo?.title || "Loading..."}
            {todo?.priority === "high" && (
              <FaExclamationCircle className="text-red-500" />
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1 text-base">
            {todo?.description || "No description available"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Priority Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <div
                className={`mt-1 flex items-center gap-2 text-sm font-semibold ${
                  todo?.isCompleted ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo?.isCompleted ? (
                  <>
                    <FaCheckCircle /> Completed
                  </>
                ) : (
                  <>
                    <FaTimesCircle /> Pending
                  </>
                )}
              </div>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-600">
                Priority:
              </span>
              <span
                className={`mt-1 inline-block px-3 py-1 text-sm font-semibold rounded-full capitalize ${
                  todo?.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : todo?.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {todo?.priority || "N/A"}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaTag /> Tags
            </div>
            {todo?.tags.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {todo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-indigo-200 transition-colors"
                  >
                    {"#"}
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-400 italic">No tags added</p>
            )}
          </div>

          {/* Mentioned Users */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaUser /> Mentioned Users
            </div>
            {todo?.mentionedUsers.length ? (
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {todo.mentionedUsers.map((user, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>{" "}
                    {"@"}
                    {user}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-400 italic">
                No users mentioned
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <FaStickyNote /> Notes
            </div>
            {todo?.note.length ? (
              <ul className="mt-2 space-y-2">
                {todo.note.map((note, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-400 italic">
                No notes available
              </p>
            )}
          </div>

          {/* Created Date */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaCalendarAlt />
            <span>
              Created: {todo?.createdAt ? timeAgo(todo?.createdAt) : "N/A"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
