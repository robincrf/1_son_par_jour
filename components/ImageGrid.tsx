"use client";

import { LazyMotionDiv } from "@/components/LazyMotion";
import Image from "next/image";

const images = [
    { src: "/images/photo-1505964253539-4ca5a36328dd.avif", alt: "Ambiance concert musique urbaine" },
    { src: "/images/des-son-arrive-sur-scene-hamza-est-alle-au-contact-de-son-jeune-public-1696896629.jpg", alt: "Artiste rap français en concert" },
    { src: "/images/photo-1534528741775-53994a69daeb.webp", alt: "Portrait artistique musique" },
    { src: "/images/photo-1549605735-a452d45d5efb.avif", alt: "Atmosphère studio d'enregistrement" },
    { src: "/images/photo-1620281408936-b34691bbb34a.avif", alt: "Scène musicale hip-hop" },
    { src: "/images/photo-1621618963067-137bd4c9d04a.avif", alt: "Artiste émergent sur scène" },
    { src: "/images/photo-1621619054919-167f2fcf135c.jpeg", alt: "Coulisses industrie musicale" },
    { src: "/images/0x1900-000000-80-0-0-1-1.jpg.webp", alt: "Visuel artistique musique" },
    { src: "/images/photo-1667833966178-f98135a582f8.avif", alt: "Énergie concert rap" },
    { src: "/images/photo-1684853989999-750020879283.avif", alt: "Moment musical intense" },
    { src: "/images/photo-1735838466022-55227f38d1ad.avif", alt: "Artiste en performance live" },
    { src: "/images/theodora-nnoman1-chang_martin_-fete-de-lhumanite.jpg.webp", alt: "Festival musique française" },
];

export default function ImageGrid() {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 h-full w-full">
                {images.map((image, i) => (
                    <LazyMotionDiv
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 1 }}
                        className="relative w-full h-full aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                            priority={i < 4}
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </LazyMotionDiv>
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
    );
}
