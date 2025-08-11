//Карточка пользователя
'use client'; 

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import Link from "next/link";

//тип TS
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
type UserCardProps = {
    user: User;
    onDelete: (id: number) => void;
    currentSearch: string | null;
    currentCompany: string | null;
    };
    
export default function UserCard({ user, onDelete, currentSearch, currentCompany }: UserCardProps) {
    return (
        <Card className="shadow-md "> 
            <CardHeader>
                <CardTitle className="flex justify-center"> {user.name}</CardTitle>
            </CardHeader>
            <CardContent> 
                <p> Email: {user.email}</p>
                <p> Компания: {user.company.name}</p>
            </CardContent>
            <CardFooter className="flex gap-2 justify-center"> 
            <Button
                asChild
                className="border border-violet-400 bg-violet-200 text-black px-4 py-2 rounded-lg hover:bg-violet-100 transition-colors"
            >
                <Link href={`/user/${user.id}?search=${encodeURIComponent(currentSearch || "")}&company=${encodeURIComponent(currentCompany || "")}`} >
                    Подробнее
                </Link>
            </Button>
                <Button className="border border-red-300 bg-red-100 text-black px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors" onClick={() => onDelete(user.id)}> 
                    Удалить 
                </Button>
            </CardFooter>
        </Card>
    );
}


/*type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }; 
};*/ 