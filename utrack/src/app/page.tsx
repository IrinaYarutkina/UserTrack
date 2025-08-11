'use client';

import UserCard from "components/UserCard";
import type { User } from "@/context/UserContext"; 
import Search from "components/Search";
import FilterCompany from "components/FilterCompany";
import AddUserButton from "components/AddUserButton";
import { useUserContext } from "@/context/UserContext";
import { Skeleton } from "components/ui/Skeleton";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import ErrorCard from "components/ErrorCard";
import { getUsers } from "lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link"; 

function UsersContent() {
  const { users, setUsers, deleteUserLocally, addUserLocally } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const company = searchParams.get('company') || null;

  const [searchTerm, setSearchTerm] = useState(search);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(company);
  
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    initialData: users.length ? users : undefined,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set('search', searchTerm);
    if (selectedCompany) params.set('company', selectedCompany);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, selectedCompany, router]);

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
    return (
      <div className="p-6">
        <ErrorCard message={`Ошибка загрузки: ${(error as Error).message}`} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-64 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
            <Skeleton className="h-10 w-32 rounded-md bg-gray-200 animate-pulse" />
          </>
        ) : (
          <>
            <Search onSearch={setSearchTerm} />
            <FilterCompany
              companies={companies}
              selectedCompany={selectedCompany}
              onChange={setSelectedCompany}
            />
            <AddUserButton onAddUser={addUserLocally} />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {isLoading
          ? [...Array(9)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-md bg-gray-200 animate-pulse" />
            ))
          : filteredUsers.map(user => (
              <Link
                key={user.id}
                href={`/user/${user.id}?search=${encodeURIComponent(searchTerm)}&company=${encodeURIComponent(selectedCompany || '')}`}
                className="block"
              >
                <UserCard 
                  user={user} 
                  onDelete={deleteUserLocally}
                  currentSearch={search} 
                  currentCompany={company}  
                />
              </Link>
            ))
        }
      </div>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={
      <div className="p-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">
          <Skeleton className="h-10 w-64 rounded-md bg-gray-200 animate-pulse" />
          <Skeleton className="h-10 w-40 rounded-md bg-gray-200 animate-pulse" />
          <Skeleton className="h-10 w-32 rounded-md bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-md bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
    }>
      <UsersContent />
    </Suspense>
  );
}