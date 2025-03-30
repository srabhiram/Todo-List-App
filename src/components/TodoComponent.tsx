/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import CreateTodoDailog from "./TodoDailog";
import { Checkbox } from "./ui/checkbox";
import { TodoType, useAppContext } from "@/app/context/userContext";
import TodoUI from "./skeeton ui/Todo-UI";
import axios from "axios";
import DeleteComponent from "./DeleteComponent";
import EditComponent from "./EditComponent";
import { timeAgo } from "@/helpers/timeago";
import AddNoteDialog from "./AddNoteDialog";
import { useRouter } from "next/navigation";

const TodoComponent = ({ userId }: { userId: string }) => {
  const { todoData, fetchTodos, loading, setLoading } = useAppContext();
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchTodos(userId);

    // ✅ Reset filters when user changes
    setSelectedPriority("");
    setSelectedTags([]);
    setSortBy("");
  }, [fetchTodos, userId, setLoading]);

  // ✅ Memoizing 'TodoData' to update when userId changes
  const TodoData = useMemo(() => {
    return todoData?.filter((todo) => todo.user === userId) || [];
  }, [todoData, userId]);

  const filterTodos = useCallback(
    (todos: TodoType[]): TodoType[] => {
      return todos.filter((todo) => {
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => todo.tags?.includes(tag));
        const matchesPriority =
          selectedPriority === "" || todo.priority === selectedPriority;
        return matchesTags && matchesPriority;
      });
    },
    [selectedTags, selectedPriority]
  );

  const sortTodos = useCallback(
    (todos: TodoType[]): TodoType[] => {
      return [...todos].sort((a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (sortBy === "priority") {
          const priorityOrder: Record<string, number> = {
            high: 3,
            medium: 2,
            low: 1,
          };
          return (
            (priorityOrder[b.priority || "low"] || 1) -
            (priorityOrder[a.priority || "low"] || 1)
          );
        }
        return 0;
      });
    },
    [sortBy]
  );

  // ✅ Update filteredTodos whenever userId, TodoData, or filters change
  useEffect(() => {
    let updatedTodos = filterTodos(TodoData);
    updatedTodos = sortTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  }, [
    userId,
    TodoData,
    selectedPriority,
    selectedTags,
    sortBy,
    filterTodos,
    sortTodos,
  ]);

  const handleTodoDelete = async (todo_id: string) => {
    try {
      await axios.delete("/api/todo/delete", {
        params: { todoId: todo_id },
      });
      fetchTodos(userId);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleToggleComplete = async (
    todoId: string,
    currentState: boolean
  ) => {
    try {
      await axios.put(
        "/api/todo/edit",
        {
          formData: { isCompleted: !currentState }, // Toggle state
        },
        {
          params: { todoId }, // Pass the todoId as a query param
        }
      );

      fetchTodos(userId); // Refresh todo list
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  if (loading) return <TodoUI />;

  return (
    <>
      <div className="flex justify-between items-center">
        <CreateTodoDailog userId={userId} />
        <div className="flex gap-3">
          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">Sort By</option>
            <option value="date">Newest First</option>
            <option value="priority">Priority</option>
          </select>

          {/* Priority Filter */}
          <select
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white my-3 p-4 rounded shadow-md">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <div key={todo._id} className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Checkbox
                    className="border-black border-2"
                    checked={todo.isCompleted}
                    onCheckedChange={() => {
                      handleToggleComplete(todo._id, todo.isCompleted);
                    }}
                  />
                  <button
                    className="font-semibold"
                    onClick={() => router.push(`/todos/${todo.user}?todoId=${todo._id}`)}
                  >
                    {todo.title}
                  </button>
                </div>
                <div className="flex gap-1 items-center">
                  <AddNoteDialog userId={userId} todoId={todo._id} />
                  <EditComponent todo={todo} />
                  <DeleteComponent
                    todoId={todo._id}
                    handleTodoDelete={handleTodoDelete}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {/* Badge for Priority */}
                {todo.priority && (
                  <span
                    className={`text-white w-fit text-sm rounded px-1 py-1 ${
                      todo.priority === "high"
                        ? "bg-red-500"
                        : todo.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {todo.priority.charAt(0).toUpperCase() +
                      todo.priority.slice(1)}
                  </span>
                )}
                <p className="text-xs text-gray-500">
                  {timeAgo(todo.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-gray-400 flex justify-center items-center text-center text-xl">
            <p>No Todos found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TodoComponent;
