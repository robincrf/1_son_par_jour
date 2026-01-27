import CardLayout from "@/components/CardLayout";
import ImageGrid from "@/components/ImageGrid";
import HeroTitle from "@/components/HeroTitle";
import Player from "@/components/Player";
import Footer from "@/components/Footer";
import data from "@/data.json";

export default function Home() {
  const today = new Date().toISOString().split("T")[0];
  // Basic logic to pick track based on date, defaulting to first if no match
  const track = data.find((t) => t.date === today) || data[0];

  return (
    <main className="w-full h-screen relative bg-black">
      <CardLayout>
        <ImageGrid />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <HeroTitle title={track.title} />
        </div>
        <Player url={track.url} />
        <Footer artist={track.artist} date={track.date} />
      </CardLayout>
    </main>
  );
}
