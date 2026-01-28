import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArtistBySlug, getTracksByArtist, ARTISTS } from "@/lib/track";
import { ArrowLeft, ExternalLink, Music } from "lucide-react";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTISTS.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  
  if (!artist) {
    return {
      title: "Artiste non trouvé",
    };
  }

  return {
    title: `${artist.name} — Artiste`,
    description: artist.description,
    openGraph: {
      title: `${artist.name} | 1 Son 1 Jour`,
      description: artist.description,
    },
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  
  if (!artist) {
    notFound();
  }

  const tracks = await getTracksByArtist(slug);

  // JSON-LD pour l'artiste
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    description: artist.description,
    genre: artist.genre,
    track: tracks.map((t) => ({
      "@type": "MusicRecording",
      name: t.title,
      url: t.deezerLink,
    })),
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/archive" 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Archives</span>
          </Link>
          <Link href="/" className="text-white font-bold tracking-tight">
            <span className="text-white/80">1</span> SON{" "}
            <span className="text-white/80">1</span> JOUR
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Artist Image Placeholder */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center flex-shrink-0">
              <Music className="w-12 h-12 md:w-16 md:h-16 text-white/40" />
            </div>

            {/* Artist Info */}
            <div className="flex-1">
              <span className="text-xs uppercase tracking-widest text-white/40 mb-2 block">
                Artiste
              </span>
              <h1 className="text-4xl md:text-6xl font-serif mb-4">{artist.name}</h1>
              <p className="text-white/60 text-lg max-w-2xl mb-4">
                {artist.description}
              </p>
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                {artist.genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tracks */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-serif mb-6">
          Sons sur 1 Son 1 Jour
          <span className="text-white/40 text-lg ml-2">({tracks.length})</span>
        </h2>

        {tracks.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <p>Aucun son disponible pour cet artiste.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tracks.map((track, index) => (
              <article 
                key={`${track.title}-${index}`}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 md:p-6 transition-all duration-300 flex items-center gap-4 md:gap-6"
              >
                {/* Cover */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={track.cover}
                    alt={`Pochette de ${track.title} par ${track.artist}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold truncate">
                    {track.title}
                  </h3>
                  <p className="text-white/60 text-sm">{track.album}</p>
                </div>

                {/* Actions */}
                {track.deezerLink && (
                  <a
                    href={track.deezerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    <span className="hidden md:inline">Écouter sur Deezer</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2026 1 Son 1 Jour. Tous droits réservés.</p>
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link href="/archive" className="hover:text-white transition-colors">Archives</Link>
            <Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
