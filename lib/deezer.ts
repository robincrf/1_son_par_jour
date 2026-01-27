export interface DeezerTrack {
    title: string;
    artist: string;
    preview: string;
    cover: string;
    album: string;
    duration: number;
    deezerLink: string | null;
    updatedAt: string;
    nextUpdateAt: string;
}

export async function fetchDailyTrack(): Promise<DeezerTrack> {
    const response = await fetch("/api/track", {
        next: { revalidate: 60 }, // Revalidate every minute to check for updates
    });
    
    if (!response.ok) {
        throw new Error("Failed to fetch daily track");
    }
    
    return response.json();
}

export function getTimeUntilNextUpdate(nextUpdateAt: string): {
    hours: number;
    minutes: number;
    seconds: number;
} {
    const now = new Date();
    const next = new Date(nextUpdateAt);
    const diff = next.getTime() - now.getTime();
    
    if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
}
