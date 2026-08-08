# Property Finds - Real Estate Platform

A modern, AI-powered real estate platform for browsing, searching, and analyzing properties in Ghana. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

### Core Features
- **Property Browsing**: Browse 40+ properties with advanced filtering (type, city, price, bedrooms)
- **Natural Language Search**: Search properties using conversational queries like "3-bedroom house near airport under 800K"
- **Property Details**: Comprehensive property pages with multiple images, agent info, and comparable listings
- **Saved Properties**: Save favorite properties to localStorage for later viewing
- **Agent Profiles**: Browse and view agent details with contact information
- **Blog Section**: Real estate tips, market analysis, and investment guides

### AI-Powered Features
- **Price Estimation**: AI algorithm estimates property values based on area, type, and bedrooms
- **Comparable Listings**: Automatically finds similar properties for market comparison
- **Market Analysis**: Provides insights on pricing trends and market positioning
- **Property Analysis**: Detailed market insights including DOM (Days On Market) data

### Property Categories
- Houses
- Apartments
- Commercial Properties
- Office Spaces
- Warehouses
- Land

### Locations
- Accra
- Tema
- Kumasi
- Sekondi-Takoradi
- Cape Coast

## Project Structure

```
app/
├── page.tsx                 # Homepage with hero section and search
├── properties/
│   ├── page.tsx            # Property listing with advanced filters
│   └── [id]/page.tsx       # Individual property detail pages
├── ai-features/
│   └── page.tsx            # AI price estimator and analysis tools
├── agents/
│   ├── page.tsx            # Agent listing page
│   └── [id]/page.tsx       # Individual agent profile pages
├── blog/
│   ├── page.tsx            # Blog listing with search
│   └── [id]/page.tsx       # Individual blog post pages
├── saved/
│   └── page.tsx            # Saved properties page
├── layout.tsx              # Root layout
└── globals.css             # Theme and global styles

components/
├── Header.tsx              # Navigation header with mobile support
├── Footer.tsx              # Footer with links and contact info
└── PropertyCard.tsx        # Reusable property card component

lib/
└── mockData.ts             # Mock data, AI utilities, and type definitions

public/
├── properties/             # Property images (11 generated)
├── agents/                 # Agent profile photos (3 generated)
├── testimonials/           # Testimonial images (3 generated)
├── blog/                   # Blog header images (3 generated)
└── hero-banner.png         # Hero section background
```

## Data Model

### Property
- ID, title, description, type, price
- Location, city, bedrooms, bathrooms, area
- Images, featured status
- Agent ID, posted date
- For sale/rent status, rental price
- Features list

### Agent
- ID, name, phone, email
- Profile image, number of properties, rating
- Bio description

### Blog Post
- ID, title, excerpt, content
- Image, date, author, category

### Testimonial
- ID, name, role, content
- Image, rating

## Key Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Data**: Mock JSON data with TypeScript interfaces
- **Storage**: localStorage for saved properties
- **Images**: AI-generated placeholder images

## Features Implemented

### Homepage
- Hero banner with dynamic search bar
- Natural language search parsing
- Property categories section
- Featured properties grid
- Latest listings
- Featured agents showcase
- Client testimonials
- Blog section preview
- Call-to-action section

### Properties Pages
- **Listing**: Advanced filtering (type, city, price, bedrooms, sale/rent)
- **Detail**: Image gallery, property details, agent contact, similar properties

### AI Features
- **Price Estimator**: Adjustable sliders for area and bedrooms, estimated price with confidence
- **Market Analysis**: Comparable listings, market insights, pricing comparison table
- **Natural Language Search**: Parses queries to extract filters

### Agents
- Agent cards with ratings and statistics
- Detailed agent profiles with:
  - Experience and success metrics
  - Client reviews
  - Specialized property listings
  - Contact information

### Blog
- Blog listing with search and category filters
- Detailed blog posts with related articles
- Author and date information

### Saved Properties
- localStorage-based favorites system
- Quick remove and clear all functionality
- Integrated save button on all property cards

## Color Scheme

- **Primary**: Sophisticated blue (`oklch(0.42 0.15 240)`)
- **Secondary**: Warm tan (`oklch(0.88 0.08 45)`)
- **Accent**: Fresh green (`oklch(0.55 0.18 120)`)
- **Neutrals**: Off-white background, dark blue text

## Getting Started

### Installation
```bash
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
pnpm start
```

## Deployment

The project can be deployed to Vercel with a single click. All dependencies are included in `package.json`.

## Future Enhancements

- Backend database integration (Neon PostgreSQL)
- User authentication
- Advanced AI-powered recommendations
- Real-time chatbot support
- Video property tours
- Mortgage calculator
- Payment processing for property listings
- Admin dashboard for property management

## Notes

- All data is mock data for demonstration
- Images are AI-generated
- Natural language search is rule-based parsing
- localStorage is used for saved properties (no backend required)
- The platform is fully functional as a viewing/browsing application

---

Built with v0 by Vercel
