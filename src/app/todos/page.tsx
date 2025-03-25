"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { useUserContext } from "../context/userContext";
import TodoComponent from "@/components/TodoComponent";
import Sidebar from "@/components/Sidebar";

const TodoPage = () => {
  const { usersData } = useUserContext();
  console.log(
    "Type of userData:",
    Array.isArray(usersData) ? "Array" : "Object"
  );

  return (
    <>
      <header>
        <Navbar user={usersData} />
      </header>
      <section className="flex gap-4 mx-5 mt-5">
        <div className="mx-3 p-2 bg-gray-200 w-1/3">
          <Sidebar/>
        </div>
        <TodoComponent/>
      </section>
    </>
  );
};

export default TodoPage;
