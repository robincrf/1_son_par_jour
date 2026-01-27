"use client";

import { motion } from "framer-motion";

interface FooterProps {
    artist: string;
    date: string;
    deezerLink?: string | null;
}

function DeezerIcon({ className }: { className?: string }) {
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className={className}
        >
            <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027h-5.19zm6.271 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03h-5.19zm6.271 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z"/>
        </svg>
    );
}

export default function Footer({ artist, date, deezerLink }: FooterProps) {
    return (
        <div className="absolute bottom-6 md:bottom-10 left-8 right-8 flex justify-between items-end z-20 pointer-events-none text-white mix-blend-difference">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="flex flex-col text-xs md:text-sm tracking-widest font-grotesk"
            >
                <span className="font-bold uppercase mb-1">{artist}</span>
                <span className="opacity-60">{date}</span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="flex flex-col items-end gap-2 pointer-events-auto"
            >
                {deezerLink && (
                    <a 
                        href={deezerLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:opacity-60 transition-opacity"
                    >
                        <span className="text-xs tracking-wide">Écouter sur</span>
                        <DeezerIcon className="w-16 h-4 md:w-20 md:h-5" />
                    </a>
                )}
                <span className="text-[10px] opacity-40">Powered by Deezer</span>
            </motion.div>
        </div>
    );
}
