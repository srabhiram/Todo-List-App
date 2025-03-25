'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

export interface UserDataProps {
    _id: string;
    displayname: string;
    username: string;
    todos: [];
}

interface ContextProps {
    usersData: UserDataProps[];
    TodoData: string[];
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
    const TodoData:string[] = [];

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
        }
    };

    return <UserContext.Provider value={{ usersData, TodoData }}>{children}</UserContext.Provider>;
}
