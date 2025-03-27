"use client";

import { useUserContext } from "@/app/context/userContext";
import React, { useState } from "react";
import CreateTodoDailog from "./CreateTodoDailog";
import { Checkbox } from "./ui/checkbox";

type Priority = {
  high: boolean;
  medium: boolean;
  low: boolean;
};

const CreateTodoPage = ({ userId }: { userId: string }) => {
  const { createTodo, TodoData, error,updateTodoStatus } = useUserContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: { high: false, medium: false, low: false },
    tags: [] as string[],
    dueDate: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox changes for priority
  const handlePriorityChange = (field: keyof Priority) => {
    setFormData((prev) => ({
      ...prev,
      priority: {
        ...prev.priority,
        [field]: !prev.priority[field],
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      tags: formData.tags,
      dueDate: formData.dueDate,
      completed: false,
    };

    try {
      await createTodo(todo, userId);
      setFormData({
        title: "",
        description: "",
        priority: { high: false, medium: false, low: false },
        tags: [],
        dueDate: "",
      });
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  };

  return (
    <>
      <CreateTodoDailog
        formData={formData}
        handleChange={handleChange}
        handlePriorityChange={handlePriorityChange}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        error={error}
      />

      <div className="bg-white my-3 p-4 rounded shadow-md">
        {TodoData?.length > 0 ? (
          TodoData.map((todo) => (
            <div key={todo._id} className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Checkbox
                    className="border-black border-2"
                    checked={todo.completed}
                    onCheckedChange={() => {}}
                  />
                  <h1 className="font-semibold">{todo.title}</h1>
                </div>
                <div className="flex gap-3">
                  <button className="text-blue-500">Note</button>
                  <button className="text-green-500">Edit</button>
                  <button className="text-red-500">Delete</button>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <p className="text-gray-700">Description: {todo.description}</p>

                {/* ✅ Conditionally display priority only if at least one is true */}
                {(todo.priority.high || todo.priority.medium || todo.priority.low) && (
                  <span className="text-white bg-red-500 w-fit text-sm rounded px-1 py-1">
                    {todo.priority.high
                      ? "High"
                      : todo.priority.medium
                      ? "Medium"
                      : "Low"}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No Todos Available</p>
        )}
      </div>
    </>
  );
};

export default CreateTodoPage;
