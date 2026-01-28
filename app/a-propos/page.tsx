import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Music, Calendar, Users, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos — Notre mission",
  description: "Découvrez 1 Son 1 Jour, votre rendez-vous quotidien pour découvrir de nouveaux artistes et de nouvelles pépites musicales. Une sélection soignée chaque jour.",
  openGraph: {
    title: "À propos | 1 Son 1 Jour",
    description: "Votre rendez-vous quotidien pour découvrir de nouveaux artistes",
  },
};

export default function AProposPage() {
  const features = [
    {
      icon: Calendar,
      title: "Un son par jour",
      description: "Chaque jour à 12h, découvrez une nouvelle pépite musicale soigneusement sélectionnée.",
    },
    {
      icon: Users,
      title: "Artistes émergents",
      description: "Nous mettons en lumière les talents de la scène française et internationale.",
    },
    {
      icon: Headphones,
      title: "Écoute facile",
      description: "Écoutez un extrait directement sur le site et retrouvez le titre complet sur Deezer.",
    },
    {
      icon: Music,
      title: "Genres variés",
      description: "Du rap au hip-hop en passant par la trap et le cloud rap, explorez de nouveaux horizons.",
    },
  ];

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
          <Link href="/" className="text-white font-bold tracking-tight">
            <span className="text-white/80">1</span> SON{" "}
            <span className="text-white/80">1</span> JOUR
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            À propos de<br />
            <span className="text-white/60">1 Son 1 Jour</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Votre dose quotidienne de découvertes musicales. Parce que la musique mérite d&apos;être partagée, 
            nous vous proposons chaque jour un nouveau son à découvrir.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-12 text-center">
            Notre concept
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-white/60 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">
            Notre mission
          </h2>
          <div className="prose prose-invert prose-lg mx-auto text-white/70">
            <p>
              Dans un monde où les algorithmes nous enferment dans des bulles musicales, 
              <strong className="text-white"> 1 Son 1 Jour</strong> propose une alternative humaine et curieuse.
            </p>
            <p>
              Chaque jour, notre équipe sélectionne un morceau qui mérite d&apos;être découvert. 
              Pas de publicité, pas d&apos;algorithme — juste une passion pour la musique et l&apos;envie 
              de vous faire découvrir des artistes talentueux.
            </p>
            <p>
              Que vous soyez amateur de rap français, de hip-hop ou simplement curieux de nouvelles sonorités, 
              revenez chaque jour à 12h pour votre dose de découverte musicale.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">
            Prêt à découvrir ?
          </h2>
          <p className="text-white/60 mb-8">
            Retournez sur la page d&apos;accueil pour écouter le son du jour.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            <Headphones className="w-5 h-5" />
            Écouter le son du jour
          </Link>
        </div>
      </section>

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
