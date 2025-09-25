import { Header, Gallery, Footer } from "@/components";

export function GalleryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
}