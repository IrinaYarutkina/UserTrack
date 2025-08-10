'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@components/ui/card"; 
import { Button } from "@components/ui/button"; 
import { useUserContext, User as ContextUser } from "@/context/UserContext";

export default function PageUser() {
    const { id } = useParams();
    const router = useRouter();
    const { users, setUsers } = useUserContext();
    const userFromContext = users.find(u => u.id === Number(id)) || null; //поиск пользователя по айди
    const [user, setUser] = useState<ContextUser | null>(null);
    const [isEditing, setIsEditing] = useState(false); //редактирование

    useEffect(() => {
        setUser(userFromContext);
    }, [userFromContext]);
    if (!user) {
        return <div className="p-6">Загрузка...</div>;
    }
    const handleSave = () => {
        if (!user) return;
        setUsers(prev => prev.map(u => u.id === user.id ? user : u));
        setIsEditing(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-lg max-w-3xl border border-[oklch(70.2%_0.183_293.541)] bg-[oklch(96.2%_0.018_272.314)]">
                <CardHeader>
                    <CardTitle className="flex justify-center">{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p><strong>Username: </strong>{user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Адрес:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <p><strong>Вебсайт:</strong> {user.website}</p>
                    <p><strong>Компания:</strong> {user.company.name}</p>
                </CardContent>
                <CardFooter className="flex gap-2 justify-center">
                    <Button onClick={() => router.push("/")}
                        className="border border-[oklch(81.1%_0.111_293.571)] bg-[oklch(94.3%_0.029_294.588)] text-black px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                        > Назад
                    </Button>
                    <Button onClick={() => setIsEditing(true)}
                        className="border border-lime-400 bg-lime-100 text-black px-4 py-2 rounded-lg hover:bg-lime-50 transition-colors"
                        > Редактировать 
                    </Button>
                </CardFooter>
            </Card>

            {/* Модальное окно редактирования */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4 flex justify-center">Редактировать</h2>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Имя: </span>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="flex-1" />
                        </div>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Email: </span>
                            <input
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Адрес: </span>
                            <input
                            type="text"
                            value={user.address.street}
                            onChange={(e) => setUser({ ...user, address:{...user.address, street: e.target.value }})}
                            className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Телефон: </span>
                            <input
                            type="text"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            className="w-full"
                            />
                        </div>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Вебсайт: </span>
                            <input
                            type="text"
                            value={user.website}
                            onChange={(e) => setUser({ ...user, website: e.target.value })}
                            className="w-full"
                        />
                        </div>
                        <div className="flex items-center gap-2 mb-2 border p-2">
                            <span className="font-semibold"> Компания: </span>
                            <input
                            type="text"
                            value={user.company.name}
                            onChange={(e) => setUser({ ...user, company: {...user.company, name: e.target.value }})}
                            className="w-full"
                        />
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-300 rounded"
                            >
                                Сохранить
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}