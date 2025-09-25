import { Header, Projects, Footer } from "@/components";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Projects />
      <Footer />
    </div>
  );
}