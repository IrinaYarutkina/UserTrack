// components/Providers.tsx
"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                {children}
            </UserProvider>
        </QueryClientProvider>
    );
}
