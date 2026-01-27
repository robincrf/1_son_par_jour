"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Play, Pause, Disc } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Player({ url }: { url: string }) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        soundRef.current = new Howl({
            src: [url],
            html5: true,
            onplay: () => setPlaying(true),
            onpause: () => setPlaying(false),
            onend: () => setPlaying(false),
        });

        return () => {
            soundRef.current?.unload();
        };
    }, [url]);

    useEffect(() => {
        let animationFrame: number;
        const updateProgress = () => {
            if (soundRef.current && playing) {
                const seek = soundRef.current.seek();
                const duration = soundRef.current.duration();
                if (typeof seek === "number" && duration) {
                    setProgress((seek / duration) * 100);
                }
                animationFrame = requestAnimationFrame(updateProgress);
            }
        };
        if (playing) {
            animationFrame = requestAnimationFrame(updateProgress);
        }
        return () => cancelAnimationFrame(animationFrame);
    }, [playing]);

    const togglePlay = () => {
        if (!soundRef.current) return;
        if (playing) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
    };

    return (
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center z-20 px-8">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full mb-4 hover:bg-white/90 transition-colors"
            >
                {playing ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
            </motion.button>

            <div className="w-full max-w-md h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
