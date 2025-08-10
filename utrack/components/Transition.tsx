"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation"; 

interface TransitionProps {
    children: React.ReactNode;
}

export default function Transition({ children }: TransitionProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ position: "relative" }}
        >
            {children}
        </motion.div>
        </AnimatePresence>
    );
}