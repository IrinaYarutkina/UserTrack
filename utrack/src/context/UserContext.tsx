"use client";
import { createContext, useContext, useState, useEffect } from "react";

type Address = { street: string; city: string; zipcode: string };
type Company = { name: string };
export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
};

type UserContextType = {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    deleteUserLocally: (id: number) => void; 
    addUserLocally: (user: Omit<User, "id" | "address"> & { address?: Address }) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const stored = localStorage.getItem("users");
        if (stored) {
        setUsers(JSON.parse(stored));
        } else {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data);
            localStorage.setItem("users", JSON.stringify(data));
        });
    }
    }, []);

  // Сохраняется 
    useEffect(() => {
    if (users.length > 0) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    }, [users]);
    //удаление
    const deleteUserLocally = (id: number) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    const addUserLocally = (user: Omit<User, "id" | "address"> & { address?: Address }) => {
        const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
        const newUser: User = {
            id: newId,
            address: user.address || { street: "", city: "", zipcode: "" },
            ...user,
        };
        setUsers((prev) => [...prev, newUser]);
    };


    return (
        <UserContext.Provider value={{ users, setUsers, deleteUserLocally, addUserLocally }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};
