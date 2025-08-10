'use client';

import UserCard from "@components/UserCard";
import Search from "@components/Search";
import FilterCompany from "@components/FilterCompany";
import AddUserButton from "@components/AddUserButton";
import { useUserContext } from "@/context/UserContext";
//import { Skeleton } from "@components/ui/skeleton";
import { useState, useMemo } from "react";

export default function UsersPage() {
  const { users, deleteUserLocally } = useUserContext(); 
  const [searchTerm, setSearchTerm] = useState(""); //для поиска
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null); //для фильтра
  const { addUserLocally } = useUserContext(); //кнопка добавления
  
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

  return (
    <div className="space-y-4">
      {/* Поле поиска */}
      <div className="flex items-center space-x-4 px-6 pt-6">
        <Search onSearch={setSearchTerm} />
        {/* фильтр */}
        <FilterCompany
          companies={companies}
          selectedCompany={selectedCompany}
          onChange={setSelectedCompany}
        />
        <AddUserButton onAddUser={addUserLocally} />
      </div>

    {/* пользователи */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onDelete={deleteUserLocally} />
        ))}
      </div>
    </div>
  );
}