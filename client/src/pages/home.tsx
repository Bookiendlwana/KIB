import { Header, Hero, Footer } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
