import Link from "next/link";
import CardLayout from "@/components/CardLayout";
import ImageGrid from "@/components/ImageGrid";
import HeroTitle from "@/components/HeroTitle";
import DailyPlayer from "@/components/DailyPlayer";
import Footer from "@/components/Footer";
import { getCurrentTrack } from "@/lib/track";

export default async function Home() {
  const track = await getCurrentTrack();
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full h-screen relative bg-black">
      <CardLayout>
        <ImageGrid />
        
        {/* Header avec navigation */}
        <header className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between">
          <div className="text-white text-xl font-bold tracking-tight" aria-label="1 Son 1 Jour">
            <span className="text-white/80">1</span> SON{" "}
            <span className="text-white/80">1</span> JOUR
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link 
              href="/archive" 
              className="text-white/60 hover:text-white transition-colors"
            >
              Archives
            </Link>
            <Link 
              href="/a-propos" 
              className="text-white/60 hover:text-white transition-colors"
            >
              À propos
            </Link>
          </nav>
        </header>

        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <HeroTitle title={track.title} cover={track.cover} artist={track.artist} />
        </div>
        <DailyPlayer 
          url={track.preview} 
          nextUpdateAt={track.nextUpdateAt}
        />
        <Footer artist={track.artist} date={today} deezerLink={track.deezerLink} />
      </CardLayout>
    </main>
  );
}
