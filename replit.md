# Kanguya Builders Website

## Overview

A professional construction company website built with a modern full-stack architecture for Kanguya Builders, an established Cape Town-based construction company with 14+ years of experience. The application showcases their authentic services, projects, and provides functionality for clients to request quotes, contact the company, and submit reviews. The site features authentic business information including their actual contact details, physical address, specialized services, and a comprehensive customer review system for feedback and ratings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application using React with TypeScript for type safety
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system featuring orange and blue brand colors
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing (currently single page with smooth scrolling navigation)
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API endpoints under `/api` prefix
- **Storage**: In-memory storage implementation (MemStorage) with interface for easy database migration
- **Validation**: Zod schemas shared between client and server for consistent validation
- **Development**: Hot reload with Vite integration in development mode

### Data Layer
- **Database**: Configured for PostgreSQL with Drizzle ORM
- **Schema**: Type-safe database schema definitions using Drizzle
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless driver for PostgreSQL connectivity
- **Current State**: Using in-memory storage with sample data, ready for database migration

### Key Features
- **Project Showcase**: Display construction projects with images, descriptions, and categories
- **Service Listings**: Comprehensive service offerings from new construction to maintenance
- **Quote Requests**: Form-based quote request system with validation
- **Contact Management**: Contact form for general inquiries
- **Review System**: Customer review and rating system with approval workflow
- **Responsive Design**: Mobile-first responsive design with smooth animations

### Development Workflow
- **Development**: `npm run dev` - runs Express server with Vite HMR
- **Build**: `npm run build` - creates optimized production build
- **Database**: `npm run db:push` - pushes schema changes to database
- **Type Checking**: `npm run check` - TypeScript compilation check

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary database (configured via DATABASE_URL)
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe SQL toolkit for database operations
- **Drizzle Kit**: Database migrations and schema management

### UI & Styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icons including social media icons

### Forms & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite**: Build tool with HMR and optimizations
- **TypeScript**: Type safety throughout the application
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins for Replit

### Utilities
- **TanStack Query**: Data fetching and caching
- **Date-fns**: Date utility library
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **clsx & Tailwind Merge**: Conditional className utilities