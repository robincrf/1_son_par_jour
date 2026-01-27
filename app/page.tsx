import CardLayout from "@/components/CardLayout";
import ImageGrid from "@/components/ImageGrid";
import HeroTitle from "@/components/HeroTitle";
import DailyPlayer from "@/components/DailyPlayer";
import Footer from "@/components/Footer";

async function getDailyTrack() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : "http://localhost:3000";
  
  try {
    const response = await fetch(`${baseUrl}/api/track`, {
      next: { revalidate: 60 }, // Revalidate every minute
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    
    return response.json();
  } catch {
    // Fallback si l'API échoue
    return {
      title: "Son du jour",
      artist: "1 Son Par Jour",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "/images/photo-1667833966178-f98135a582f8.avif",
      nextUpdateAt: new Date().toISOString(),
      deezerLink: null,
    };
  }
}

export default async function Home() {
  const track = await getDailyTrack();
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="w-full h-screen relative bg-black">
      <CardLayout>
        <ImageGrid />
        
        {/* Logo */}
        <div className="absolute top-6 left-6 z-20">
          <h1 className="text-white text-xl font-bold tracking-tight">
            <span className="text-white/80">1</span> SON{" "}
            <span className="text-white/80">1</span> JOUR
          </h1>
        </div>

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
