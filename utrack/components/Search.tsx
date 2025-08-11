'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type UserSearchProps = {
    onSearch: (query: string) => void;
};

export default function Search({ onSearch }: UserSearchProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('search') || '';
    const [query, setQuery] = useState(initialQuery);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        const params = new URLSearchParams(window.location.search);

        if (val) {
            params.set('search', val);
        } else {
            params.delete('search');
        }

        router.replace(`?${params.toString()}`, { scroll: false });
        onSearch(val);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Введите имя"
            className="border px-3 py-2 rounded w-full max-w-sm text-sm sm:text-base md:text-lg focus:outline-none focus:border-indigo-400"
        />
    );
}
