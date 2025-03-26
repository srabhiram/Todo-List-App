/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface UserDataProps {
  _id: string;
  displayname: string;
  username: string;
  todos: string[]; // Fixed: Changed from [] to string[]
}

interface Todo {
    _id?: string,
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
  createTodo: (todo: Omit<Todo, 'user'>, userId: string) => Promise<void>;
  fetchTodos: (userId: string) => Promise<void>;
  error: string | null;
}

const UserContext = createContext<ContextProps | null>(null);

// Custom hook for context consumption
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a ContextProvider');
  }
  return context;
};

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [usersData, setUsersData] = useState<UserDataProps[]>([]);
  const [TodoData, setTodoData] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/getUser`);
      const data = await response.json();
      setUsersData(data.data);

     
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsersData([]);
      setTodoData([]);
    }
  };

//   Creating todo post request
  const createTodo = async (todo: Omit<Todo, 'user'>,userId:string) => {
    setError(null);
    try {
     
      if (!userId) {
        throw new Error('No user found. Please log in.');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/todo/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          user: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }

      const result = await response.json();
      const newTodoId = result.task._id;

      setTodoData((prev) => [...prev, newTodoId]);
      setUsersData((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, todos: [...user.todos, newTodoId] }
            : user
        )
      );
    } catch (err:any) {
      setError(err.message);
      throw err;
    }
  };

//   fetching user specific todos
const fetchTodos = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URI}/api/todo/get?user=${userId}`);
      const data = await response.json();
      setTodoData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodoData([]);
    }
  }, []);
  

  return (
    <UserContext.Provider value={{ usersData, TodoData, createTodo, error, fetchTodos }}>
      {children}
    </UserContext.Provider>
  );
}