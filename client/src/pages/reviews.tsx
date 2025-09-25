import { Header, Reviews, Footer } from "@/components";

export function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Reviews />
      <Footer />
    </div>
  );
}