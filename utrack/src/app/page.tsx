'use client';

import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
      name: string;
  };
}; 
export default function UsersPage() {
  const [users, setUsers] = useState<User []>([]); //состояние пользователи
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then((data: User[]) => setUsers(data))
    .catch(err => console.error("Ошибка загрузки:", err));
  }, 
  []
); 
const handleDelete = (id: number) => {
  setUsers(prev => prev.filter(user => user.id !== id));
}; 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6"> 
    {users.map(user => (
      <UserCard key={user.id} user={user} onDelete={handleDelete} />
    ))}
    </div>
  );
}
