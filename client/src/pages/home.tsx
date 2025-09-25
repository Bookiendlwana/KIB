import { Header, Hero, Footer } from "@/components";
import HomeBackground from "@/components/HomeBackground";

export default function Home() {
  return (
    <HomeBackground>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <Footer />
      </div>
    </HomeBackground>
  );
}
