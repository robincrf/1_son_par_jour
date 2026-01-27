// Liste des musiques à jouer (une par jour, dans l'ordre)
const TRACK_LIST = [
    { artist: "63og", title: "poukwa" },
    { artist: "63og", title: "unejournée" },
    { artist: "Gouap RTTCLAN", title: "Scarface 2" },
    { artist: "Jeune Morty", title: "biber" },
];

// Date de départ (première musique)
const START_DATE = new Date("2026-01-27");

function getDaysSinceStart(): number {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate());
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function shouldUpdate(): boolean {
    const now = new Date();
    const hours = now.getHours();
    // La musique change à 12h00
    return hours >= 12;
}

export function getNextUpdateTime(): string {
    const now = new Date();
    const next = new Date(now);
    
    if (now.getHours() >= 12) {
        // Prochain update demain à 12h
        next.setDate(next.getDate() + 1);
    }
    next.setHours(12, 0, 0, 0);
    
    return next.toISOString();
}

async function searchTrack(artist: string, title: string) {
    const query = encodeURIComponent(`${artist} ${title}`);
    const response = await fetch(
        `https://api.deezer.com/search?q=${query}&limit=1`,
        { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
        throw new Error("Failed to search on Deezer");
    }
    
    const data = await response.json();
    return data.data?.[0] || null;
}

export async function getCurrentTrack() {
    try {
        const daysSinceStart = getDaysSinceStart();
        const hasPassedNoon = shouldUpdate();
        
        // Index basé sur le jour (change à midi)
        let trackIndex = hasPassedNoon ? daysSinceStart : daysSinceStart - 1;
        
        // Boucler sur la liste si on dépasse
        trackIndex = Math.max(0, trackIndex) % TRACK_LIST.length;
        
        const trackInfo = TRACK_LIST[trackIndex];
        const track = await searchTrack(trackInfo.artist, trackInfo.title);
        
        if (!track || !track.preview) {
            throw new Error("Track not found on Deezer");
        }
        
        return {
            title: track.title,
            artist: track.artist.name,
            preview: track.preview,
            cover: track.album.cover_xl || track.album.cover_big,
            album: track.album.title,
            duration: track.duration,
            deezerLink: track.link,
            updatedAt: new Date().toISOString(),
            nextUpdateAt: getNextUpdateTime(),
        };
    } catch (error) {
        console.error("Deezer API error:", error);
        // Fallback en cas d'erreur
        return {
            title: "Son du jour",
            artist: "Artiste inconnu",
            preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "/images/photo-1667833966178-f98135a582f8.avif",
            album: "Album",
            duration: 30,
            deezerLink: null,
            updatedAt: new Date().toISOString(),
            nextUpdateAt: getNextUpdateTime(),
        };
    }
}
