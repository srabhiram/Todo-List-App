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
import { FaSort, FaFilter, FaTasks, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TodoComponent = ({ userId }: { userId: string }) => {
  const { todoData, fetchTodos, loading, setLoading } = useAppContext();
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5; // Number of todos per page

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchTodos(userId);
    setSelectedPriority("");
    setSelectedTags([]);
    setSortBy("");
    setCurrentPage(1); // Reset to first page when user changes
  }, [fetchTodos, userId, setLoading]);

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
        { formData: { isCompleted: !currentState } },
        { params: { todoId } }
      );
      fetchTodos(userId);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const totalTodos = filteredTodos.length;
  const totalPages = Math.ceil(totalTodos / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <TodoUI />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaTasks className="text-indigo-600 text-2xl" />
          <h1 className="text-2xl font-bold text-gray-800">Your Todos</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSort className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Sort By</option>
              <option value="date">Newest First</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="relative">
            <FaFilter className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <CreateTodoDailog userId={userId} />
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {currentTodos.length > 0 ? (
          currentTodos.map((todo) => (
            <div
              key={todo._id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    className="h-5 w-5 border-2 border-gray-400 rounded-md text-indigo-600 focus:ring-indigo-500"
                    checked={todo.isCompleted}
                    onCheckedChange={() =>
                      handleToggleComplete(todo._id, todo.isCompleted)
                    }
                  />
                  <button
                    onClick={() =>
                      router.push(`/todos/${todo.user}?todoId=${todo._id}`)
                    }
                    className={`text-lg font-semibold ${
                      todo.isCompleted
                        ? "text-gray-400 line-through"
                        : "text-gray-800 hover:text-indigo-600"
                    } transition-colors`}
                  >
                    {todo.title}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <AddNoteDialog userId={userId} todoId={todo._id} />
                  <EditComponent todo={todo} />
                  <DeleteComponent
                    todoId={todo._id}
                    handleTodoDelete={handleTodoDelete}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                {todo.priority && (
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      todo.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : todo.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {todo.priority.charAt(0).toUpperCase() +
                      todo.priority.slice(1)}
                  </span>
                )}
                <div className=" flex flex-wrap gap-2">
                {todo.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full text-xs font-medium hover:bg-indigo-200 transition-colors"
                  >
                         {"#"}{tag}
                  </span>
                ))}
              </div>
                <span className="text-xs text-gray-500">
                  {timeAgo(todo.createdAt)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <FaTasks className="mx-auto text-gray-300 text-4xl mb-4" />
            <p className="text-gray-500 text-lg">No Todos found</p>
            <button
              onClick={() => document.getElementById("create-todo-btn")?.click()}
              className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <FaPlus /> Add your first todo
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalTodos > todosPerPage && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstTodo + 1} to{" "}
            {Math.min(indexOfLastTodo, totalTodos)} of {totalTodos} todos
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                    } transition-colors`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoComponent;