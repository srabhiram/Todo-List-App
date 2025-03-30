/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

// Interfaces and types

type AppContextType = {
  userData: User[] | null;
  setUserData: React.Dispatch<React.SetStateAction<User[] | null>>;
  todoData: TodoType[] | null;
  setTodoData: React.Dispatch<React.SetStateAction<TodoType[] | null>>;
  fetchTodos: (userId: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
// User type
export type User = {
  _id: string;
  username: string;
  displayname: string;
};

// Todo type
export type TodoType = {
  _id: string;
  title: string;
  description: string;
  mentionedUsers: string[];
  priority: string;
  isCompleted: boolean;
  tags: string[];
  note: string[];
  user: string;
  createdAt: Date;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<User[] | null>(null);
  const [todoData, setTodoData] = useState<TodoType[] | null>(null);
  const [loading, setLoading] = useState(false);

  // function for fetch users from getUsers endpoint
  const fetchUsers = useCallback(async () => {
    const res = await axios.get("/api/getUsers");
    setUserData(res.data.data);
  }, []);

  // function for fetching todos for current user
  const fetchTodos = useCallback(async (userId: string) => {
    if (!userId) return;
    try {
      const res = await axios.get("/api/todo/get", {
        params: { user: userId },
      });
      setTodoData(res.data.data);
    } catch (error:any) {
      console.error(error.message);
      throw new Error("Error fetching todos");
    } finally{
      setLoading(false);
    }
  }, []);
  // useffect fo rendering the users at the component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // context provider values
  const contextValue: AppContextType = {
    userData,
    setUserData,
    todoData,
    setTodoData,
    fetchTodos,
    loading,
    setLoading,
  };

  return (
    <AppContext.Provider value={contextValue as AppContextType | null}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
}
