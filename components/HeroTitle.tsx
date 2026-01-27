"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroTitleProps {
    title: string;
    cover?: string;
    artist?: string;
}

export default function HeroTitle({ title, cover, artist }: HeroTitleProps) {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center p-4">
            {/* Cover de l'album */}
            {cover && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="relative w-48 h-48 md:w-64 md:h-64 mb-6 rounded-lg overflow-hidden shadow-2xl"
                >
                    <Image
                        src={cover}
                        alt={`Cover de ${title}`}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            )}
            
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="text-[8vw] md:text-[4vw] leading-[0.9] font-serif text-center text-white mix-blend-difference tracking-tighter"
            >
                {title.toUpperCase()}
            </motion.h1>
            
            {artist && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-2 text-sm md:text-base text-white/80"
                >
                    {artist}
                </motion.p>
            )}
            
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
