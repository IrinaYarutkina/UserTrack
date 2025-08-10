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

    return (
        <UserContext.Provider value={{ users, setUsers }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};
