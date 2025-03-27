/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface UserDataProps {
  _id: string;
  displayname: string;
  username: string;
  todos: string[];
}

interface Todo {
  _id?: string;
  title: string;
  description?: string;
  priority: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  user: string;
}

interface ContextProps {
  usersData: UserDataProps[];
  TodoData: Todo[];
  setTodoData: React.Dispatch<React.SetStateAction<Todo[]>>;
  createTodo: (todo: Omit<Todo, "user">, userId: string) => Promise<void>;
  fetchTodos: (userId: string) => Promise<void>;
  updateTodoStatus: (todoId:string, completed:boolean)=>Promise<void>;
  error: string | null;
}

const UserContext = createContext<ContextProps | null>(null);

// Custom hook for context consumption
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a ContextProvider");
  }
  return context;
};

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usersData, setUsersData] = useState<UserDataProps[]>([]);
  const [TodoData, setTodoData] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/getUser`
      );
      const data = await response.json();
      setUsersData(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsersData([]);
      setTodoData([]);
    }
  };

  // Create todo function
  const createTodo = async (todo: Omit<Todo, "user">, userId: string) => {
    setError(null);
    try {
      if (!userId) {
        throw new Error("No user found. Please log in.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/todo/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...todo,
            user: userId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create todo");
      }

      const result = await response.json();
      const newTodo: Todo = result.task; // ✅ Full todo object

      setTodoData((prev) => [...prev, newTodo]); // ✅ Correctly updating state

      setUsersData((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, todos: [...user.todos, newTodo._id!] }
            : user
        )
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Fetch todos for a specific user
  const fetchTodos = useCallback(async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URI}/api/todo/get?user=${userId}`
      );
      const data = await response.json();
      setTodoData(data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodoData([]);
    }
  }, []);
 // ✅ Update todo completion status
 const updateTodoStatus = async (todoId: string, completed: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/todo/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todoId, completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const { todo } = await response.json();

      // ✅ Update state in real-time
      setTodoData((prevTodos) =>
        prevTodos.map((t) => (t._id === todo._id ? { ...t, completed: todo.completed } : t))
      );
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };


  return (
    <UserContext.Provider
      value={{ usersData, TodoData, createTodo, error, fetchTodos, setTodoData, updateTodoStatus }}
    >
      {children}
    </UserContext.Provider>
  );
}
