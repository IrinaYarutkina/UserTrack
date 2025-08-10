"use client";
import { createContext, useContext, useState, useEffect } from "react";
interface Address {
    street: string;
    city: string;
    zipcode: string;
}
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: {
        name: string;
    };
}
interface UserContextType {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    deleteUserLocally: (id: number) => void;
    addUserLocally: (user: Omit<User, "id" | "address"> & { address?: Address }) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCompany: string | null;
    setSelectedCompany: React.Dispatch<React.SetStateAction<string | null>>;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null);


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

        const storedSearch = localStorage.getItem("searchTerm");
        const storedCompany = localStorage.getItem("selectedCompany");
        if (storedSearch) setSearchTerm(storedSearch);
        if (storedCompany) setSelectedCompany(storedCompany);
    }, []);

  // Сохраняется польз
    useEffect(() => {
    if (users.length > 0) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    }, [users]);
    // сохраняется поиск, фильтр
    useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        if (selectedCompany !== null) {
            localStorage.setItem("selectedCompany", selectedCompany);
        }
    }, [selectedCompany]);

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
        <UserContext.Provider 
        value={{
            users,
            setUsers,
            deleteUserLocally,
            addUserLocally,
            searchTerm,
            setSearchTerm,
            selectedCompany,
            setSelectedCompany }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within UserProvider");
    return ctx;
};
