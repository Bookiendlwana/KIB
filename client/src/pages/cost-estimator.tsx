import { Header, CostEstimator, Footer } from "@/components";

export default function CostEstimatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <CostEstimator />
      <Footer />
    </div>
  );
}