# Minecore Group - AI Automation Agency

## Overview

Minecore Group is a Laval & Montreal-based AI automation implementation agency built as a modern full-stack web application. The system showcases productized automation modules (Chatbot, Voicebot, CRM Kommo, Custom Automations) with transparent Setup + Recurring pricing model. The application targets solopreneurs and local SMEs (1-25 employees, up to $5M revenue) looking to generate more revenue while working less through intelligent automation solutions.

**Current Business Model**: Setup fees ($990-$1,900) + Monthly recurring plans (Starter $500, Pro $1,000, Growth $1,500+) with module-based productized services.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the application
- **Database**: PostgreSQL (configured via Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage

### Monorepo Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript types and database schemas
- `public/` - Static file serving directory

## Key Components

### Database Schema
The application uses two main tables:
- **consultations**: Captures detailed lead information through a multi-step form including business details, automation goals, and lead scoring
- **blog_posts**: Content management for SEO-optimized blog articles with metadata

### Lead Capture System
- Multi-step consultation form with progressive data collection
- Automated lead scoring algorithm based on company size, revenue, growth, and budget
- Form validation using Zod schemas shared between client and server

### Content Management
- Blog system with SEO optimization (meta descriptions, keywords, read time)
- Static file serving for marketing materials
- Internationalization support (English/French)

### API Structure
RESTful API endpoints:
- `POST /api/consultations` - Create consultation requests
- `GET /api/consultations` - Admin dashboard data
- `PATCH /api/consultations/:id/contacted` - Update contact status
- Blog endpoints for content management

## Data Flow

1. **Lead Generation**: Users interact with consultation forms on various pages
2. **Data Validation**: Client-side validation with Zod schemas, server-side validation for security
3. **Lead Scoring**: Automated scoring algorithm calculates lead quality (A-F grades)
4. **Data Storage**: Consultation data stored in PostgreSQL with timestamps and contact status
5. **Admin Management**: Dashboard for reviewing and managing consultation requests

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless for scalable data storage
- **Deployment**: Replit autoscale deployment with build optimization
- **CDN**: Font Awesome for icons, Google Fonts for typography

### Development Tools
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **ESBuild**: Production bundling for server-side code
- **Drizzle Kit**: Database migrations and schema management

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **React Hook Form**: Performant form handling with minimal re-renders

## Deployment Strategy

The application uses Replit's autoscale deployment:
- **Development**: `npm run dev` starts both client and server in development mode
- **Build Process**: Vite builds the client, ESBuild bundles the server
- **Production**: Single Node.js process serving both static files and API
- **Database**: Automatic provisioning of PostgreSQL database via environment variables

## User Preferences

**Communication Style**: Simple, everyday language (non-technical explanations)

**System Architecture Preferences**:
- Simple external solutions only, no complex internal configurations
- Admin panel to be used as primary CRM system for lead management
- Email notifications preferred but not critical (console logs acceptable)
- Database-backed persistence for all lead data

**Business Requirements**:
- Automatic lead capture and scoring
- Detailed lead information display
- Quick action capabilities (email, phone links)
- French language support for admin interface
- Focus on lead conversion and follow-up efficiency

## Recent Changes

- **October 8, 2025**: Strategic Website Restructuring - Productized Service Framework
  - **Business Model Transformation**: Shifted from consultation-based to productized modules with transparent Setup + Recurring pricing
  - **Homepage Restructuring**: 
    - New value proposition: "Générez plus de revenus en travaillant moins" (Generate More Revenue While Working Less)
    - Setup + Recurring pricing model prominently displayed (990$-1900$ setup + 500$-1500$/month)
    - 4 standardized modules showcased: Chatbot, Voicebot, CRM Kommo, Custom Automations
    - Technology stack transparency section added: n8n (self-hosted automation), Kommo CRM (all-in-one), OpenAI (AI capabilities)
    - Laval & Montreal local market focus badge
  - **Pricing Page Overhaul**:
    - New tier structure: Starter ($500/month), Pro ($1,000/month), Growth ($1,500+/month)
    - Setup fees clearly displayed for each tier ($990, $1,400, $1,900)
    - Target audience descriptions: Solopreneurs (Starter), Growing SMEs (Pro), Established businesses (Growth)
    - Module-based package breakdown showing what's included
  - **Services Page Reorganization**:
    - Shifted from problem/solution structure to module-based framework
    - Detailed module cards with features: Chatbot (80% automation), Voicebot (70% phone workload reduction), CRM Kommo (all-in-one), Automations (custom workflows)
    - Technology stack benefits section explaining n8n, Kommo CRM, OpenAI advantages
    - 3-step implementation process: Discover (consultation), Build (installation), Optimize (ongoing support)
  - **Translation System Enhancement**:
    - Added 100+ new translation keys for bilingual support (English/French)
    - French-first content strategy for Laval/Montreal market
    - All hard-coded text converted to i18n translation keys
    - Removed HTML tags from translation strings for clean TypeScript syntax
  - **SEO Optimization**:
    - Updated metadata to French-first: "Automatisation IA Laval Montréal | Modules Chatbot, CRM, Voicebot"
    - Local market targeting in meta description with transparent pricing mention
    - Focus on solopreneurs and PMEs in search optimization
  - **Testing & Validation**:
    - E2E testing completed successfully - all strategic framework elements validated
    - Verified language toggle functionality (French ↔ English)
    - Confirmed consultation form submission and database persistence
    - All pages render correctly with proper translations

- **July 30, 2025**: Professional Website Enhancement Implementation
  - Implemented comprehensive website improvements based on professional analysis recommendations
  - SEO optimization: Added keyword-rich H1/H2 headings ("AI Automation Services", "AI Customer Support")
  - Enhanced chatbot UX: Changed auto-open from 15% to 25% scroll with 2-second delay for less intrusiveness
  - Added service descriptor to hero section: "AI Automation for SME Business - Chatbots, Sales & Operations"
  - Pricing page clarity: Added target audience descriptions for each package (solo founders, growing SMEs, enterprises)
  - Enhanced value proposition: Moved founder story higher and added personal entrepreneur-to-entrepreneur messaging
  - Added case studies section: Real client results showing 85% processing reduction, 42% sales increase, 30 hours saved weekly
  - Improved image alt tags for better accessibility and SEO
  - Updated page title for better keyword targeting: "AI Automation Montreal | Reduce Workload 70%, Boost Revenue 40%"
  - Enhanced founder section with better positioning and Montreal automation specialist focus

- **July 25, 2025**: Translation Fix & Google Analytics Update
  - Fixed major translation issues causing missing English text across all pages
  - Removed duplicate translation keys that were causing compilation errors
  - Updated Google Analytics tag with exact script provided by user (AW-17032394525)
  - English website pages now display all content properly (services, about, contact, pricing)
  - Organized translation file structure to prevent future conflicts

- **July 13, 2025**: Google Ads Landing Page
  - Created dedicated landing page `/consultation-gratuite` for Google Ads campaigns
  - Optimized for conversion tracking with Google Analytics events
  - Focused messaging on Quebec SME market with ROI guarantees
  - Clear value proposition with 70% workload reduction and 40% revenue increase
  - User preference: Separate landing pages for campaign tracking and attribution

- **July 12, 2025**: Enhanced admin dashboard for CRM usage
  - Added comprehensive lead statistics and metrics
  - Improved lead display with detailed information cards
  - Added quick action buttons (email, phone) for each lead
  - Implemented lead scoring and status management
  - Added French translations for admin interface
  - User preference: Admin panel to be used as primary CRM system

- **July 12, 2025**: Email notification system implementation
  - Built comprehensive email notification system with Gmail integration
  - Added fallback notification system with detailed console logs
  - Implemented multi-layered notification approach (Gmail → SendGrid → Console)
  - User preference: Simple external solutions only, no complex internal dashboards

- **July 12, 2025**: Database integration completed
  - Migrated from memory storage to PostgreSQL database
  - All lead data now persistent and reliable
  - Enhanced data integrity and scalability

## Changelog

Changelog:
- June 23, 2025. Initial setup