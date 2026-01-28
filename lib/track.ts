// Liste des musiques à jouer (une par jour, dans l'ordre)
export const TRACK_LIST = [
    { artist: "63og", title: "poukwa", slug: "63og" },
    { artist: "63og", title: "unejournée", slug: "63og" },
    { artist: "Gouap RTTCLAN", title: "Scarface 2", slug: "gouap-rttclan" },
    { artist: "Jeune Morty", title: "biber", slug: "jeune-morty" },
];

// Liste des artistes uniques avec leurs informations
export const ARTISTS = [
    { 
        slug: "63og", 
        name: "63OG",
        description: "63OG est un artiste émergent de la scène rap française, connu pour son style unique mêlant mélodies envoûtantes et textes introspectifs.",
        genre: "Rap / Hip-Hop"
    },
    { 
        slug: "gouap-rttclan", 
        name: "Gouap RTTCLAN",
        description: "Gouap RTTCLAN représente la nouvelle vague du rap français avec des productions innovantes et un flow reconnaissable.",
        genre: "Rap / Trap"
    },
    { 
        slug: "jeune-morty", 
        name: "Jeune Morty",
        description: "Jeune Morty apporte une touche fraîche à la scène musicale avec ses sonorités modernes et ses textes percutants.",
        genre: "Rap / Cloud Rap"
    },
];

// Date de départ (première musique)
export const START_DATE = new Date("2026-01-27");

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
            artistSlug: trackInfo.slug,
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
            artistSlug: "unknown",
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

// Récupérer l'historique des sons passés
export async function getArchiveTracks() {
    const daysSinceStart = getDaysSinceStart();
    const hasPassedNoon = shouldUpdate();
    const currentIndex = hasPassedNoon ? daysSinceStart : daysSinceStart - 1;
    
    const archiveTracks = [];
    
    for (let i = Math.min(currentIndex, TRACK_LIST.length - 1); i >= 0; i--) {
        const trackInfo = TRACK_LIST[i];
        const date = new Date(START_DATE);
        date.setDate(date.getDate() + i);
        
        try {
            const track = await searchTrack(trackInfo.artist, trackInfo.title);
            if (track) {
                archiveTracks.push({
                    date: date.toISOString().split("T")[0],
                    title: track.title,
                    artist: track.artist.name,
                    artistSlug: trackInfo.slug,
                    cover: track.album.cover_big || track.album.cover_medium,
                    deezerLink: track.link,
                    album: track.album.title,
                });
            }
        } catch {
            // Skip failed tracks
        }
    }
    
    return archiveTracks;
}

// Récupérer les sons d'un artiste spécifique
export async function getTracksByArtist(artistSlug: string) {
    const artistTracks = TRACK_LIST.filter((t) => t.slug === artistSlug);
    const tracks = [];
    
    for (const trackInfo of artistTracks) {
        try {
            const track = await searchTrack(trackInfo.artist, trackInfo.title);
            if (track) {
                tracks.push({
                    title: track.title,
                    artist: track.artist.name,
                    cover: track.album.cover_big || track.album.cover_medium,
                    deezerLink: track.link,
                    album: track.album.title,
                    preview: track.preview,
                });
            }
        } catch {
            // Skip failed tracks
        }
    }
    
    return tracks;
}

// Récupérer les infos d'un artiste
export function getArtistBySlug(slug: string) {
    return ARTISTS.find((a) => a.slug === slug) || null;
}
