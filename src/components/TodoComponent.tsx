/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import CreateTodoDailog from "./TodoDailog";
import { Checkbox } from "./ui/checkbox";
import { useAppContext } from "@/app/context/userContext";
import TodoUI from "./skeeton ui/Todo-UI";
import { Edit } from "lucide-react";
import axios from "axios";
import DeleteComponent from "./DeleteComponent";
import EditComponent from "./EditComponent";

// type Priority = {
//   high: boolean;
//   medium: boolean;
//   low: boolean;
// };

const TodoComponent = ({ userId }: { userId: string }) => {
  const { todoData, fetchTodos, loading, setLoading } = useAppContext();
  useEffect(() => {
    setLoading(true);
    fetchTodos(userId);
  }, [fetchTodos, userId, setLoading]);
  const TodoData = todoData?.filter((todo) => todo.user === userId) || [];
  
  const handleTodoDelete = async (todo_id: string) => {
    try {
      axios.delete("/api/todo/delete", {
        params: { todoId: todo_id },
      });
      fetchTodos(userId);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  if (loading) return <TodoUI />;
  return (
    <>
      <CreateTodoDailog userId={userId} />
      <div className="bg-white my-3 p-4 rounded shadow-md">
        {TodoData?.length > 0 ? (
          TodoData?.map((todo) => (
            <div key={todo._id} className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Checkbox
                    className="border-black border-2"
                    checked={todo.isCompleted}
                    onCheckedChange={() => {}}
                  />
                  <h1 className="font-semibold">{todo.title}</h1>
                </div>
                <div className="flex gap-1 items-center">
                  <span className="cursor-pointer text-xs tracking-wide font-medium flex gap-0.5 items-center  hover:bg-black/10 px-1 py-0.5 text-black  rounded ">
                    <Edit className="w-3 " /> Add Note
                  </span>
                  <EditComponent todo = {todo}/>

                  <DeleteComponent
                    todoId={todo._id}
                    handleTodoDelete={handleTodoDelete}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                badge
                {/* {(todo.priority.high || todo.priority.medium || todo.priority.low) && (
                  <span className="text-white bg-red-500 w-fit text-sm rounded px-1 py-1">
                    {todo.priority.high
                      ? "High"
                      : todo.priority.medium
                      ? "Medium"
                      : "Low"}
                  </span>
                )} */}
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
