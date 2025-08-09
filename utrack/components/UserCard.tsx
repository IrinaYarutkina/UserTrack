//Карточка пользователя
'use client'; 

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
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
    };
 
export default function UserCard({ user, onDelete }: UserCardProps) {
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
                <Link href={`/user/${user.id}`}>
                    <Button variant="outline"> Подробнее </Button>
                </Link>
                <Button variant="destructive" onClick={() => onDelete(user.id)}> 
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