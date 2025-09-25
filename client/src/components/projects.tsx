import ProjectImage from "./ProjectImage";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectDetailsModal from "./project-details-modal";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(6);
  const { t } = useTranslation();
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };
  
  const hasMoreProjects = projects && visibleCount < projects.length;

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">{t('projects.title')}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 12 }).map((_, index) => (
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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">{t('projects.portfolio')}</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('projects.portfolioSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects?.slice(0, visibleCount).map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-navy-primary/50 transition-all"
              data-testid={`project-card-${project.id}`}
            >
              <ProjectImage src={project.imageUrl} alt={project.title} />
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">{project.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-navy-primary font-medium">
                    {t('projects.year')}: {project.completedYear}
                  </span>
                  <ProjectDetailsModal project={project}>
                    <button
                      className="text-navy-primary hover:text-navy-secondary text-sm font-medium transition-colors"
                      data-testid={`project-details-${project.id}`}
                    >
                      {t('projects.viewDetails')}
                    </button>
                  </ProjectDetailsModal>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="bg-navy-primary hover:bg-navy-secondary text-white px-8 py-3 rounded-lg transition-colors font-medium"
              data-testid="see-more-projects"
            >
              {t('common.view')} {t('nav.projects')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
