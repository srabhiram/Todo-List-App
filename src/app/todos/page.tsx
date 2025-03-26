"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import TodoComponent from "@/components/TodoComponent";
import Sidebar from "@/components/Sidebar";

export type UserProps = {
  _id: string;
  displayname: string;
  username: string;
};


const TodoPage = () => {
  const { usersData, fetchTodos } = useUserContext();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  // Update currentUser when user data changes and fetch todos
  useEffect(() => {
    if (usersData.length > 0 && !currentUser) {
      setCurrentUser(usersData[0]);
    }
  }, [usersData, currentUser]);

  // Fetch todos when currentUser changes
  useEffect(() => {
    if (currentUser?._id) {
      fetchTodos(currentUser._id);
    }
  }, [currentUser, fetchTodos]);
  
  return (
    <>
      <header>
        <Navbar user={usersData} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </header>
      <section className="flex gap-3 mx-4 mt-5 h-full">
        <div className="mx-3 p-2 bg-white rounded w-1/7 flex-shrink-0 shadow-md h-screen">
          <Sidebar />
        </div>

        <div className="mx-3 p-2  flex-grow h-full">
          <TodoComponent userId={currentUser?._id || ""}/>
        </div>
      </section>
    </>
  );
};

export default TodoPage;
