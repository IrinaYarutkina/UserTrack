"use client";
import Link from "next/link"; 

export default function Header() {
return (
    <header className="bg-[oklch(94.3%_0.029_294.588)] shadow-sm sticky top-0 z-50"> 
        <div className="container mx-auto px-4 py-3 flex items-center justify-between"> 
            <Link href="/" className="text-xl font-bold text-black-600"> 
                UTracker | User Tracker 
            </Link>
            <nav className="hidden sm:flex gap-6 text-gray-600"> 
                <Link href="/" className="hover: text-black transition-colors "> 
                    Главная
                </Link>
            </nav>
        </div>
    </header>
); 
} 