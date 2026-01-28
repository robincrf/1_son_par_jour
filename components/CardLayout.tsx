"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CardLayout({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8 bg-black">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative w-full h-full max-w-[1400px] max-h-[900px] overflow-hidden bg-[#0A0A0A] border-[1px] border-white/10 md:border-white rounded-[2rem] shadow-2xl",
                    className
                )}
            >
                <div className="absolute inset-0 bg-white/5 pointer-events-none z-10 hidden md:block border-[1px] border-white/5 rounded-[1.8rem] m-2" />
                {children}
            </motion.div>
        </div>
    );
}
