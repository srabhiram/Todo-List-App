"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProps } from "@/app/todos/page";
import { FaUserCircle, FaTasks } from "react-icons/fa";

// Types and interfaces
type NavbarProps = {
  user: UserProps[] | null;
  currentUser: UserProps | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const Navbar = ({ user, currentUser, setCurrentUser }: NavbarProps) => {
  // Handling user change in select component
  const handleUserChange = (displayname: string) => {
    const selectedUser = user?.find((u) => u.displayname === displayname);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg border-b border-gray-200">
      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <FaTasks className="text-indigo-600 text-2xl" />
        <h1 className="text-xl font-semibold text-gray-800">Todo List</h1>
      </div>

      {/* User Selection and Display */}
      <div className="flex items-center gap-6">
        <Select
          value={currentUser?.displayname || ""}
          onValueChange={handleUserChange}
        >
          <SelectTrigger className="w-[180px] bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pl-3 pr-8">
            <div className="flex items-center gap-2">
              
              <SelectValue
                placeholder={
                  user && user.length > 0 ? "Select a user" : "No users available"
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

        {/* Current User Display */}
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