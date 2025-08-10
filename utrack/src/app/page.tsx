'use client';

import UserCard from "@components/UserCard";
import type { User } from "@/context/UserContext"; 
import Search from "@components/Search";
import FilterCompany from "@components/FilterCompany";
import AddUserButton from "@components/AddUserButton";
import { useUserContext } from "@/context/UserContext";
import { Skeleton } from "@components/ui/Skeleton";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Ошибка загрузки");
  return res.json();
}

export default function UsersPage() {
  const { users, setUsers, deleteUserLocally, addUserLocally } = useUserContext();
  const [searchTerm, setSearchTerm] = useState(""); //поиск
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    initialData: users.length ? users : undefined,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);


  const companies = useMemo(() => {
    const setCompanies = new Set(users.map(user => user.company.name));
    return Array.from(setCompanies);
  }, [users]); 

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = selectedCompany ? user.company.name === selectedCompany : true;
      return matchesName && matchesCompany;
    });
  }, [users, searchTerm, selectedCompany]);

  if (error) {
    return <div className="p-6 text-red-600">Ошибка загрузки: {(error as Error).message}</div>;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-6 pt-6">
        {isLoading ? (
          <>
          {/* скелетоны */}
          <Skeleton className="h-10 w-64 rounded-md bg-gray-200 animate-pulse" />
          <Skeleton className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
          <Skeleton className="h-10 w-32 rounded-md bg-gray-200 animate-pulse" />
          </>
        ) : (
          <>
        {/* поиск */}
        <Search onSearch={setSearchTerm} />
        {/* фильтр */}
        <FilterCompany
          companies={companies}
          selectedCompany={selectedCompany}
          onChange={setSelectedCompany}
        />
        <AddUserButton onAddUser={addUserLocally} />
          </>
        )}
      </div>

    {/* пользователи */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {isLoading
          ? [...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-md bg-gray-200 animate-pulse" />
            ))
          : filteredUsers.map(user => (
              <UserCard key={user.id} user={user} onDelete={deleteUserLocally} />
            ))
        }
      </div>
    </div>
  );
}