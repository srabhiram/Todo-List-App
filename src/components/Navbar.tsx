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

// types and interfaces
type NavbarProps = {
  user: UserProps[] | null;
  currentUser: UserProps | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const Navbar = ({ user, currentUser, setCurrentUser }: NavbarProps) => {
  // handling users change in selec component
  const handleUserChange = (displayname: string) => {
    const selectedUser = user?.find((u) => u.displayname === displayname);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <header className="flex justify-between p-2 bg-white shadow-md">
      <h1>Todo List</h1>
      <div className="flex gap-4">
        <Select
          value={currentUser?.displayname || ""}
          onValueChange={handleUserChange}
        >
          <SelectTrigger className="w-[150px] border-2 bg-white">
            <SelectValue
              placeholder={
                user && user?.length > 0
                  ? "Select a user"
                  : "No users available"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {user?.map((userItem) => (
              <SelectItem value={userItem.displayname} key={userItem._id}>
                {userItem.displayname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-5 items-center">
          <b>{currentUser?.displayname || "No user selected"}</b>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
