"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Disc, Mail } from "lucide-react";

export default function Footer({ artist, date }: { artist: string, date: string }) {
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
                className="flex gap-4 pointer-events-auto"
            >
                <a href="#" className="hover:opacity-60 transition-opacity"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Twitter className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Disc className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="#" className="hover:opacity-60 transition-opacity"><Mail className="w-4 h-4 md:w-5 md:h-5" /></a>
            </motion.div>
        </div>
    );
}
