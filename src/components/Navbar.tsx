"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, useAppContext } from "@/app/context/userContext";
import { FaUserCircle, FaTasks, FaFileExport } from "react-icons/fa";

// Types and interfaces
type NavbarProps = {
  user: User[] | null;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const Navbar = ({ user, currentUser, setCurrentUser }: NavbarProps) => {
  const { todoData } = useAppContext();

  // Handling user change in select component
  const handleUserChange = (displayname: string) => {
    const selectedUser = user?.find((u) => u.displayname === displayname);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  // Export todos as JSON
  const handleExportTodos = () => {
    if (!currentUser || !todoData) return;

    const userTodos = todoData.filter((todo) => todo.user === currentUser._id);
    if (userTodos.length === 0) return;

    const jsonData = JSON.stringify(userTodos, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentUser.displayname}_todos.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Check if export should be disabled
  const isExportDisabled =
    !currentUser ||
    !todoData ||
    todoData.filter((todo) => todo.user === currentUser?._id).length === 0;

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg border-b border-gray-200">
      <div className="flex items-center gap-2">
        <FaTasks className="text-indigo-600 text-2xl" />
        <h1 className="text-xl font-semibold text-gray-800">Todo List</h1>
      </div>

      <div className="flex items-center gap-6">
        <Select
          value={currentUser?.displayname || ""}
          onValueChange={handleUserChange}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-3 pr-8">
            <div className="flex items-center gap-2">
              <SelectValue
                placeholder={
                  user && user.length > 0
                    ? "Select a user"
                    : "No users available"
                }
              />
            </div>
          </SelectTrigger>

          <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
            {user?.map((userItem) => (
              <SelectItem
                value={userItem.displayname}
                key={userItem._id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"
              >
                {userItem.displayname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={handleExportTodos}
          disabled={isExportDisabled}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <FaFileExport />
          <span className="text-sm font-medium">Export</span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle className="text-gray-500 text-xl" />
          <span className="text-sm font-medium text-gray-700">
            {currentUser?.displayname || (
              <span className="text-gray-400 italic">No user selected</span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
