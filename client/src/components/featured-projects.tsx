import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ProjectDetailsModal from "./project-details-modal";
import type { Project } from "@shared/schema";

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Show only first 6 projects on home page
  const featuredProjects = projects?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <section id="featured-projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">{t('projects.featured')}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence, attention to detail, and unwavering commitment to customer satisfaction sets us apart as the premier choice for all your building and renovation needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">{t('projects.featured')}</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence, attention to detail, and unwavering commitment to customer satisfaction sets us apart as the premier choice for all your building and renovation needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-orange-primary/50 transition-all"
              data-testid={`featured-project-card-${project.id}`}
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-orange-primary font-medium">
                    {t('projects.completed')} {project.completedYear}
                  </span>
                  <ProjectDetailsModal project={project}>
                    <button 
                      className="text-orange-primary hover:text-orange-secondary text-sm font-medium transition-colors"
                      data-testid={`featured-project-details-${project.id}`}
                    >
                      {t('projects.viewDetails')}
                    </button>
                  </ProjectDetailsModal>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button 
              className="bg-orange-primary hover:bg-orange-secondary text-white px-8 py-3 rounded-lg font-medium transition-colors"
              data-testid="see-more-projects"
            >
              See More Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}