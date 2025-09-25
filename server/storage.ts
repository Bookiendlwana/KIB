import {
  type Project,
  type InsertProject,
  type QuoteRequest,
  type InsertQuoteRequest,
  type ContactMessage,
  type InsertContactMessage,
  type Review,
  type InsertReview,
} from "../shared/schema.ts";
import { randomUUID } from "crypto";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;

  // Reviews
  getReviews(): Promise<Review[]>;
  getApprovedReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  approveReview(id: string): Promise<Review | undefined>;

  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private reviews: Map<string, Review>;
  private quoteRequests: Map<string, QuoteRequest>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.projects = new Map();
    this.reviews = new Map();
    this.quoteRequests = new Map();
    this.contactMessages = new Map();

    this.initializeData();
  }

  private initializeData() {
    // Authentic Kanguya Builders projects
  const sampleProjects: InsertProject[] = [
      // ...existing projects except the one referencing the missing image...
      {
        title: "Modern Home Renovation",
        description: "A complete transformation of a family home, focusing on open-plan living and modern finishes.",
        detailedDescription: "This project included a full interior and exterior renovation, new kitchen and bathrooms, and custom carpentry throughout. The result is a bright, functional, and stylish home for a growing family.",
        imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.10 (1)_1756736058564.jpeg",
        additionalImages: [
          "/projects/WhatsApp Image 2025-08-26 at 20.10.10 (1)_1756736058564.jpeg"
        ],
        location: "Cape Town",
        completedYear: "2025",
        category: "renovation",
        duration: "6 months",
        clientName: "Smith Family",
        projectScope: ["Full home renovation", "Kitchen and bathroom remodel", "Custom carpentry"],
        challenges: "Tight timeline and maintaining family comfort during construction.",
        solution: "Phased construction and daily clean-up to minimize disruption.",
        materials: ["Porcelain tiles", "Quartz countertops", "Custom cabinetry"],
        teamSize: "8 specialists"
      },
      {
        title: "Maitland Double Storey Apartments",
        description: "Double storey three bedroom apartments with block walls, slab deck, and plastering.",
        detailedDescription: "Kanguya builders built this double storey three bedroom apartments in Maitland. We built foundation, block walls, put rubben block slab deck, built on top storage, and plastered inside and outside. Completed in 2025 over two months.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.10 (1)_1756736058564.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_40_39_1.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_40_39.jpeg"
          ],
        location: "Maitland, Cape Town",
        completedYear: "2025",
        category: "apartments",
        duration: "2 months",
        clientName: "Residential Client",
        projectScope: ["Foundation", "Block walls", "Slab deck", "Plastering"],
        challenges: "Complex structure and time management.",
        solution: "Experienced team and phased construction.",
        materials: ["Blocks", "Concrete", "Plaster"],
        teamSize: "8 builders"
      },
      {
        title: "Observatory Site Progress",
        description: "Site progress and construction activities in Observatory, Cape Town.",
        detailedDescription: "Images showing site preparation, building progress, and renovation work in Observatory, Cape Town, 2025.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.12 (1)_1756736427422.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_42.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_41.jpeg"
          ],
        location: "Observatory, Cape Town",
        completedYear: "2025",
        category: "site work",
        duration: "Ongoing",
        clientName: "Various",
        projectScope: ["Site preparation", "Building progress", "Renovation"],
        challenges: "Weather and logistics.",
        solution: "Coordinated team and phased work.",
        materials: ["Bricks", "Tiles", "Concrete"],
        teamSize: "Varies"
      },
      {
        title: "Rondebosch Site Progress",
        description: "Additional site progress and construction details in Rondebosch, Cape Town.",
        detailedDescription: "Images showing different aspects of the construction and renovation process in Rondebosch, Cape Town, 2025.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.15 (1)_1756736427420.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_40_1.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_40.jpeg"
          ],
        location: "Rondebosch, Cape Town",
        completedYear: "2025",
        category: "site work",
        duration: "Ongoing",
        clientName: "Various",
        projectScope: ["Site preparation", "Building progress", "Renovation"],
        challenges: "Material supply.",
        solution: "Efficient procurement and planning.",
        materials: ["Bricks", "Tiles", "Concrete"],
        teamSize: "Varies"
      },
      {
        title: "Claremont Site Progress",
        description: "Final set of September 2025 site images in Claremont, Cape Town.",
        detailedDescription: "A collection of images showing the final stages and completed work for September 2025 in Claremont, Cape Town.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.21 (1)_1756736427418.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_39.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_38_2.jpeg"
          ],
        location: "Claremont, Cape Town",
        completedYear: "2025",
        category: "site work",
        duration: "Ongoing",
        clientName: "Various",
        projectScope: ["Site preparation", "Building progress", "Renovation"],
        challenges: "Coordination of multiple teams.",
        solution: "Regular meetings and clear communication.",
        materials: ["Bricks", "Tiles", "Concrete"],
        teamSize: "Varies"
      },
      {
        title: "Woodstock Renovation Progress",
        description: "Renovation and finishing work in Woodstock, Cape Town.",
        detailedDescription: "Images showing renovation and finishing work completed in 2025 in Woodstock, Cape Town.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.22 (1)_1756736058562.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_38.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_37_2.jpeg"
          ],
        location: "Woodstock, Cape Town",
        completedYear: "2025",
        category: "renovation",
        duration: "2 weeks",
        clientName: "Renovation Client",
        projectScope: ["Finishing", "Painting", "Tiling"],
        challenges: "Tight schedule.",
        solution: "Extra team members added.",
        materials: ["Paint", "Tiles", "Plaster"],
        teamSize: "4"
      },
      {
        title: "Kenilworth Renovation Progress",
        description: "Renovation and finishing work in Kenilworth, Cape Town.",
        detailedDescription: "Images showing renovation and finishing work completed in 2025 in Kenilworth, Cape Town.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.23 (1)_1756736058561.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_37.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_36_3.jpeg"
          ],
        location: "Kenilworth, Cape Town",
        completedYear: "2025",
        category: "renovation",
        duration: "2 weeks",
        clientName: "Renovation Client",
        projectScope: ["Finishing", "Painting", "Tiling"],
        challenges: "Tight schedule.",
        solution: "Extra team members added.",
        materials: ["Paint", "Tiles", "Plaster"],
        teamSize: "4"
      },
      {
        title: "Muizenberg Renovation Progress",
        description: "Renovation and finishing work in Muizenberg, Cape Town.",
        detailedDescription: "Images showing renovation and finishing work completed in 2025 in Muizenberg, Cape Town.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.28 (1)_1756736058558.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_36_1.jpeg",
            "/projects/WhatsApp_Image_2025_09_11_18_32_36.jpeg"
          ],
        location: "Muizenberg, Cape Town",
        completedYear: "2025",
        category: "renovation",
        duration: "2 weeks",
        clientName: "Renovation Client",
        projectScope: ["Finishing", "Painting", "Tiling"],
        challenges: "Tight schedule.",
        solution: "Extra team members added.",
        materials: ["Paint", "Tiles", "Plaster"],
        teamSize: "4"
      },
      {
        title: "Table View Renovation Progress",
        description: "Renovation and finishing work in Table View, Cape Town.",
        detailedDescription: "Images showing renovation and finishing work completed in 2025 in Table View, Cape Town.",
          imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.30 (1)_1756736023309.jpeg",
          additionalImages: [
            "/projects/WhatsApp_Image_2025_09_11_18_32_35_1.jpeg"
          ],
        location: "Table View, Cape Town",
        completedYear: "2025",
        category: "renovation",
        duration: "2 weeks",
        clientName: "Renovation Client",
        projectScope: ["Finishing", "Painting", "Tiling"],
        challenges: "Tight schedule.",
        solution: "Extra team members added.",
        materials: ["Paint", "Tiles", "Plaster"],
        teamSize: "4"
      },
      {
        title: "Luxury Apartment Upgrade",
        description: "High-end finishes and smart home features for a city apartment.",
        detailedDescription: "Upgraded flooring, lighting, and integrated smart home systems. The apartment now features energy-efficient lighting, automated blinds, and a modern kitchen.",
        imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.12 (1)_1756736427422.jpeg",
        additionalImages: [
          "/projects/WhatsApp Image 2025-08-26 at 20.10.12 (1)_1756736427422.jpeg"
        ],
        location: "Cape Town CBD",
        completedYear: "2024",
        category: "apartment upgrade",
        duration: "2 months",
        clientName: "Urban Living Inc.",
        projectScope: ["Smart home integration", "Lighting upgrade", "Kitchen remodel"],
        challenges: "Working within a high-rise with strict building regulations.",
        solution: "Coordinated with building management and used noise-minimizing tools.",
        materials: ["Engineered wood flooring", "LED lighting", "Smart home devices"],
        teamSize: "5 specialists"
      },
      {
        title: "Commercial Office Fit-Out",
        description: "A modern, collaborative workspace for a growing tech company.",
        detailedDescription: "Designed and built open-plan work areas, meeting rooms, and a staff kitchen. Focused on maximizing natural light and flexible workspaces.",
        imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.15 (1)_1756736427420.jpeg",
        additionalImages: [
          "/projects/WhatsApp Image 2025-08-26 at 20.10.15 (1)_1756736427420.jpeg"
        ],
        location: "Century City, Cape Town",
        completedYear: "2025",
        category: "office fit-out",
        duration: "3 months",
        clientName: "Tech Innovators",
        projectScope: ["Open-plan workspace", "Meeting rooms", "Staff kitchen"],
        challenges: "Maintaining business operations during construction.",
        solution: "Scheduled noisy work after hours and used dust barriers.",
        materials: ["Glass partitions", "Acoustic panels", "Laminate flooring"],
        teamSize: "10 specialists"
      },
      {
        title: "Outdoor Entertainment Area",
        description: "Custom-built patio and braai area for family gatherings.",
        detailedDescription: "Constructed a covered patio with built-in braai, seating, and lighting. The space is perfect for year-round entertaining.",
        imageUrl: "/projects/WhatsApp Image 2025-08-26 at 20.10.21 (1)_1756736427418.jpeg",
        additionalImages: [
          "/projects/WhatsApp Image 2025-08-26 at 20.10.21 (1)_1756736427418.jpeg"
        ],
        location: "Durbanville, Cape Town",
        completedYear: "2024",
        category: "outdoor living",
        duration: "1 month",
        clientName: "The Johnsons",
        projectScope: ["Patio construction", "Built-in braai", "Outdoor lighting"],
        challenges: "Weather delays during construction.",
        solution: "Used weather-resistant materials and scheduled work around forecasts.",
        materials: ["Face brick", "Outdoor tiles", "Stainless steel"],
        teamSize: "4 specialists"
  },
      {
        title: "Green Point Plastering & Screeding",
        description: "Professional plastering and screeding for commercial floors.",
        detailedDescription: "Leveling and finishing concrete floors in a Green Point commercial property, including moisture barrier installation and high-performance screed application.",
        imageUrl: "/project-images/WhatsApp Image 2025-09-02 at 17.46.39_1757324919931.jpeg",
        additionalImages: [
          "/project-images/WhatsApp Image 2025-09-02 at 17.46.39_1757324919931.jpeg",
          "/project-images/WhatsApp Image 2025-09-02 at 17.46.40_1757324919930.jpeg"
        ],
        location: "Green Point, Cape Town",
        completedYear: "2024",
        category: "plastering",
        duration: "1 week",
        clientName: "Commercial Developer",
        projectScope: [
          "Floor screeding",
          "Surface leveling",
          "Moisture barrier installation"
        ],
        challenges: "Achieving perfect level across large floor areas.",
        solution: "Used laser-guided screeding equipment and high-performance screed materials.",
        materials: [
          "Cement screed",
          "Leveling compound",
          "Moisture barrier"
        ],
        teamSize: "5 specialists"
      },
      {
        title: "Claremont Tiling Project",
        description: "Custom tile patterns and waterproofing for bathrooms and kitchens.",
        detailedDescription: "Installation of designer tiles in Claremont, including intricate patterns, bathroom waterproofing, and kitchen backsplash work.",
        imageUrl: "/project-images/WhatsApp Image 2025-09-02 at 17.46.40_1757324919930.jpeg",
        additionalImages: [
          "/project-images/WhatsApp Image 2025-09-02 at 17.46.40_1757324919930.jpeg",
          "/project-images/WhatsApp Image 2025-09-02 at 17.48.21_1757324896683.jpeg"
        ],
        location: "Claremont, Cape Town",
        completedYear: "2023",
        category: "tiling",
        duration: "4 weeks",
        clientName: "Homeowner",
        projectScope: [
          "Bathroom tiling",
          "Kitchen backsplash",
          "Custom patterns"
        ],
        challenges: "Maintaining waterproofing integrity with complex tile layouts.",
        solution: "Advanced pattern layout and premium waterproofing systems.",
        materials: [
          "Designer tiles",
          "Waterproof adhesive",
          "Sealed grout"
        ],
    teamSize: "3 tilers"
    },
    ];

    // Actually add the projects to the in-memory map
    for (const project of sampleProjects) {
      const id = randomUUID();
      // Ensure detailedDescription is never undefined (only string or null)
      this.projects.set(id, {
        ...project,
        id,
        detailedDescription: project.detailedDescription ?? null,
        additionalImages: project.additionalImages ?? null,
        teamSize: project.teamSize ?? null,
  duration: project.duration ?? null,
  clientName: project.clientName ?? null,
  projectScope: project.projectScope ?? null,
  challenges: project.challenges ?? null,
  solution: project.solution ?? null,
  materials: project.materials ?? null,
      });
    }
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      detailedDescription: insertProject.detailedDescription ?? null,
      additionalImages: insertProject.additionalImages ?? null,
      duration: insertProject.duration ?? null,
      clientName: insertProject.clientName ?? null,
      projectScope: insertProject.projectScope ?? null,
      challenges: insertProject.challenges ?? null,
      solution: insertProject.solution ?? null,
      materials: insertProject.materials ?? null,
      teamSize: insertProject.teamSize ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getApprovedReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.isApproved === "approved",
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      customerPhone: insertReview.customerPhone ?? null,
      projectLocation: insertReview.projectLocation ?? null,
      recommendToOthers: insertReview.recommendToOthers ?? "yes",
      isApproved: "pending",
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async approveReview(id: string): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (review) {
      review.isApproved = "approved";
      this.reviews.set(id, review);
      return review;
    }
    return undefined;
  }

  async createQuoteRequest(
    insertRequest: InsertQuoteRequest,
  ): Promise<QuoteRequest> {
    const id = randomUUID();
    const request: QuoteRequest = {
      ...insertRequest,
      budget: insertRequest.budget || null,
      id,
      createdAt: new Date(),
    };
    this.quoteRequests.set(id, request);
    return request;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async createContactMessage(
    insertMessage: InsertContactMessage,
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
