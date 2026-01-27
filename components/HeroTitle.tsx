"use client";

import { motion } from "framer-motion";

export default function HeroTitle({ title }: { title: string }) {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="text-[12vw] md:text-[8vw] leading-[0.9] font-serif text-center text-white mix-blend-difference tracking-tighter"
            >
                {title.toUpperCase()}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-4 text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase"
            >
                Daily Music Drop
            </motion.p>
        </div>
    );
}
