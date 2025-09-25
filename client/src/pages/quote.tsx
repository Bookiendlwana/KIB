import { Header, QuoteForm, Footer } from "@/components";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <QuoteForm />
      <Footer />
    </div>
  );
}