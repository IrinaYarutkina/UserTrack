'use client';
import { useState } from "react";

type UserSearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: UserSearchProps) {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val); 
    };

    return (
    <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Введите имя"
        className="border px-4 py-2 rounded w-full max-w-sm focus:outline-none focus:border-indigo-400"
    />
    );
}
