import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Wrench, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectDetailsModalProps {
  project: Project;
  children: React.ReactNode;
}

export default function ProjectDetailsModal({ project, children }: ProjectDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          {/* Project Image */}
          <div className="relative">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-navy-primary text-white">
                {project.category
                  ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
                  : ""}
              </Badge>
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-navy-primary" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-navy-primary" />
                <span>Completed {project.completedYear}</span>
              </div>
              {project.duration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-navy-primary" />
                  <span>Duration: {project.duration}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-navy-primary" />
                  <span>Team Size: {project.teamSize}</span>
                </div>
              )}
            </div>
            
            {project.clientName && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Client</h4>
                <p className="text-muted-foreground">{project.clientName}</p>
              </div>
            )}
          </div>

          {/* Detailed Description */}
          {project.detailedDescription && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-navy-primary" />
                Project Overview
              </h4>
              <p className="text-muted-foreground leading-relaxed">{project.detailedDescription}</p>
            </div>
          )}

          {/* Project Scope */}
          {project.projectScope && project.projectScope.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-navy-primary" />
                Project Scope
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {project.projectScope.map((scope, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-muted-foreground">{scope}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6">
            {project.challenges && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-navy-primary" />
                  Challenges
                </h4>
                <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
              </div>
            )}
            
            {project.solution && (
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-navy-primary" />
                  Our Solution
                </h4>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>

          {/* Materials Used */}
          {project.materials && project.materials.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3">Materials & Equipment</h4>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((material, index) => (
                  <Badge key={index} variant="outline" className="border-navy-primary/20 text-foreground">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-muted/50 p-6 rounded-lg text-center">
            <h4 className="font-semibold text-foreground mb-2">Interested in a Similar Project?</h4>
            <p className="text-muted-foreground mb-4">
              Contact us today for a free consultation and quote for your construction needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+27790562847"
                className="bg-navy-primary hover:bg-navy-secondary text-white px-6 py-2 rounded-lg transition-colors font-medium text-center"
                data-testid="modal-call-now"
              >
                Call Now: +27 79 056 2847
              </a>
              <a
                href="https://wa.me/27790562847?text=Hi%20Kanguya%20Builders!%20I%20saw%20your%20project%20and%20I%27m%20interested%20in%20similar%20construction%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-navy-primary text-navy-primary hover:bg-navy-primary hover:text-white px-6 py-2 rounded-lg transition-colors font-medium text-center"
                data-testid="modal-whatsapp"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}