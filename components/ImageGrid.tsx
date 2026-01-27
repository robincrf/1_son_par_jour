"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000&auto=format&fit=crop"
];

export default function ImageGrid() {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full w-full">
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="relative w-full h-full aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src={src}
                            alt="Fashion Visual"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </motion.div>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
    );
}
