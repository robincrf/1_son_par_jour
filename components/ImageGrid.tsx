"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = [
    "/images/photo-1505964253539-4ca5a36328dd.avif",
    "/images/des-son-arrive-sur-scene-hamza-est-alle-au-contact-de-son-jeune-public-1696896629.jpg",
    "/images/photo-1534528741775-53994a69daeb.webp",
    "/images/photo-1549605735-a452d45d5efb.avif",
    "/images/photo-1620281408936-b34691bbb34a.avif",
    "/images/photo-1621618963067-137bd4c9d04a.avif",
    "/images/photo-1621619054919-167f2fcf135c.jpeg",
    "/images/0x1900-000000-80-0-0-1-1.jpg.webp",
    "/images/photo-1667833966178-f98135a582f8.avif",
    "/images/photo-1684853989999-750020879283.avif",
    "/images/photo-1735838466022-55227f38d1ad.avif",
    "/images/theodora-nnoman1-chang_martin_-fete-de-lhumanite.jpg.webp",

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
                            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            priority={i < 4}
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
