import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArchiveTracks } from "@/lib/track";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Archives — Historique des sons",
  description: "Retrouvez tous les sons passés de 1 Son 1 Jour. Découvrez l'historique complet de nos sélections musicales quotidiennes.",
  openGraph: {
    title: "Archives | 1 Son 1 Jour",
    description: "Retrouvez tous les sons passés de 1 Son 1 Jour",
  },
};

export default async function ArchivePage() {
  const tracks = await getArchiveTracks();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Retour</span>
          </Link>
          <div className="text-white font-bold tracking-tight">
            <span className="text-white/80">1</span> SON{" "}
            <span className="text-white/80">1</span> JOUR
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Archives</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Retrouvez tous les sons que nous avons partagés. Chaque jour, une nouvelle découverte musicale.
          </p>
        </div>

        {tracks.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucun son archivé pour le moment.</p>
            <p className="text-sm mt-2">Revenez demain pour découvrir notre première sélection !</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tracks.map((track, index) => (
              <article 
                key={`${track.date}-${index}`}
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
                  <time className="text-xs text-white/40 uppercase tracking-wider">
                    {new Date(track.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <h2 className="text-lg md:text-xl font-semibold truncate mt-1">
                    {track.title}
                  </h2>
                  <Link 
                    href={`/artiste/${track.artistSlug}`}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {track.artist}
                  </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {track.deezerLink && (
                    <a
                      href={track.deezerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                    >
                      <span className="hidden md:inline">Écouter</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
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
            <Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
