import { Header, About, Footer } from "@/components";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <About />
      <Footer />
    </div>
  );
}