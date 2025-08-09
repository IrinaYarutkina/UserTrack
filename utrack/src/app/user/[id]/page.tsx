'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    }; 
};

export default function PageUser(){
    const { id } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false); //vjlfkrf?

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then((data: User) => setUser(data))
        .catch(err => console.error("Возникла ошибка загрузки:", err));
    }, [id]);

    if (!user) {
        return <div className="p-6"> Загрузка... </div>
    }

    return (
        <div className="p-6 space-y-4 "> 
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Адрес:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Вебсайт:</strong> {user.website}</p>
            <p><strong>Компания:</strong> {user.company.name}</p>
            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="bg-gray-300 px-4 py-2 rounded"
                > Назад </button>
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                > Редактировать </button>
            </div>
            {/* модалка */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4">Редактировать</h2>

                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="border p-2 w-full mb-2"
                        />
                        <input
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="border p-2 w-full mb-2"
                        />
                        <input
                        type="text"
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        className="border p-2 w-full mb-2"
                        />
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                            onClick={() => setIsEditing(false)}
                            className="px-2 py-2 bg-green-300 rounded"
                            > Сохранить </button>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                            > Закрыть </button>
                        </div>
                        
                    </div>     
                </div> 
            )}
        </div>
    )
}