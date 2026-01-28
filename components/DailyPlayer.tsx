"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

interface DailyPlayerProps {
    url: string;
    nextUpdateAt: string;
}

export default function DailyPlayer({ url, nextUpdateAt }: DailyPlayerProps) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [countdown, setCountdown] = useState("");
    const soundRef = useRef<Howl | null>(null);

    useEffect(() => {
        soundRef.current = new Howl({
            src: [url],
            html5: true,
            loop: true, // Boucle la musique en fond
            volume: 0.5,
            onplay: () => setPlaying(true),
            onpause: () => setPlaying(false),
        });

        return () => {
            soundRef.current?.unload();
        };
    }, [url]);

    // Mise à jour de la progression
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

    // Compte à rebours jusqu'à la prochaine mise à jour
    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const next = new Date(nextUpdateAt);
            const diff = next.getTime() - now.getTime();

            if (diff <= 0) {
                setCountdown("Nouvelle musique disponible !");
                // Recharger la page pour obtenir la nouvelle musique
                window.location.reload();
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(
                `Prochain son dans ${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [nextUpdateAt]);

    // Auto-refresh à 12h00
    useEffect(() => {
        const checkForUpdate = () => {
            const now = new Date();
            const next = new Date(nextUpdateAt);

            if (now >= next) {
                window.location.reload();
            }
        };

        // Vérifier toutes les minutes
        const interval = setInterval(checkForUpdate, 60000);
        return () => clearInterval(interval);
    }, [nextUpdateAt]);

    const togglePlay = () => {
        if (!soundRef.current) return;
        if (playing) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
    };

    return (
        <div className="absolute bottom-28 md:bottom-8 left-0 right-0 flex flex-col items-center justify-center z-20 px-8">
            {/* Countdown */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/60 text-sm mb-4 font-mono"
            >
                {countdown}
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white text-black rounded-full mb-4 hover:bg-white/90 transition-colors"
            >
                {playing ? (
                    <Pause className="w-6 h-6 fill-current" />
                ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                )}
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
