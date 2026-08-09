export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'house' | 'apartment' | 'land' | 'commercial' | 'office' | 'warehouse' | 'car';
  price: number;
  location: string;
  city: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in square meters
  image: string;
  images: string[];
  featured: boolean;
  agentId: string;
  postedDate: string;
  forSale: boolean;
  forRent: boolean;
  rentPrice?: number;
  features: string[];
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  properties: number;
  rating: number;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

// Mock Properties
export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Modern House with Pool',
    description: 'Beautiful 4-bedroom modern house with swimming pool, garden, and parking space.',
    type: 'house',
    price: 850000,
    location: 'East Legon, Accra',
    city: 'Accra',
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    image: '/properties/house-luxury.png',
    images: ['/properties/house-luxury.png', '/properties/house-luxury-2.png', '/properties/villa-elegant.png'],
    featured: true,
    agentId: '1',
    postedDate: '2024-06-15',
    forSale: true,
    forRent: false,
    features: ['Swimming Pool', 'Garden', 'Parking', 'Modern Design', 'Home Theater'],
  },
  {
    id: '2',
    title: 'Spacious 3-Bedroom Apartment',
    description: 'Modern apartment in the heart of the city with excellent amenities.',
    type: 'apartment',
    price: 450000,
    location: 'Osu, Accra',
    city: 'Accra',
    bedrooms: 3,
    bathrooms: 2,
    area: 200,
    image: '/properties/apartment-modern.png',
    images: ['/properties/apartment-modern.png', '/properties/apartment-cozy.png', '/properties/apartment-studio.png'],
    featured: true,
    agentId: '2',
    postedDate: '2024-06-10',
    forSale: true,
    forRent: true,
    rentPrice: 5000,
    features: ['Elevator', 'Security', '24/7 Power', 'Gym', 'Swimming Pool'],
  },
  {
    id: '3',
    title: 'Prime Commercial Space',
    description: 'High-traffic commercial property perfect for retail or office use.',
    type: 'commercial',
    price: 1200000,
    location: 'Dzorwulu, Accra',
    city: 'Accra',
    area: 600,
    image: '/properties/commercial-prime.png',
    images: ['/properties/commercial-prime.png', '/properties/retail-shop.png', '/properties/office-executive.png'],
    featured: true,
    agentId: '3',
    postedDate: '2024-06-12',
    forSale: true,
    forRent: true,
    rentPrice: 15000,
    features: ['Parking Lot', 'Visible Signage', 'High Foot Traffic', 'Modern Facilities'],
  },
  {
    id: '4',
    title: 'Residential Land Plot',
    description: 'Prime residential land in a developing area with excellent potential.',
    type: 'land',
    price: 180000,
    location: 'East Legon Hills, Accra',
    city: 'Accra',
    area: 1000,
    image: '/properties/land-residential.png',
    images: ['/properties/land-residential.png', '/properties/villa-elegant.png', '/properties/house-luxury.png'],
    featured: false,
    agentId: '1',
    postedDate: '2024-06-08',
    forSale: true,
    forRent: false,
    features: ['Good Road Access', 'Flat Terrain', 'Good Neighbors', 'Developed Area'],
  },
  {
    id: '5',
    title: 'Cozy 2-Bedroom Apartment',
    description: 'Affordable and comfortable apartment close to schools and shopping.',
    type: 'apartment',
    price: 280000,
    location: 'Tema, Greater Accra',
    city: 'Tema',
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    image: '/properties/apartment-cozy.png',
    images: ['/properties/apartment-cozy.png', '/properties/apartment-modern.png', '/properties/apartment-studio.png'],
    featured: false,
    agentId: '2',
    postedDate: '2024-06-14',
    forSale: true,
    forRent: true,
    rentPrice: 3000,
    features: ['Close to Schools', 'Shopping Mall Nearby', 'Quiet Neighborhood'],
  },
  {
    id: '6',
    title: 'Executive Office Suite',
    description: 'Premium office space in a prestigious business district.',
    type: 'office',
    price: 2000000,
    location: 'Airport Area, Accra',
    city: 'Accra',
    area: 800,
    image: '/properties/office-executive.png',
    images: ['/properties/office-executive.png', '/properties/commercial-prime.png', '/properties/retail-shop.png'],
    featured: true,
    agentId: '3',
    postedDate: '2024-06-13',
    forSale: false,
    forRent: true,
    rentPrice: 25000,
    features: ['Conference Room', 'Furnished', 'Parking', 'WiFi Ready', 'Security'],
  },
  {
    id: '7',
    title: 'Industrial Warehouse',
    description: 'Large warehouse space suitable for storage and light manufacturing.',
    type: 'warehouse',
    price: 3500000,
    location: 'Industrial Zone, Tema',
    city: 'Tema',
    area: 2500,
    image: '/properties/warehouse-industrial.png',
    images: ['/properties/warehouse-industrial.png', '/properties/commercial-prime.png', '/properties/office-executive.png'],
    featured: false,
    agentId: '1',
    postedDate: '2024-06-11',
    forSale: true,
    forRent: true,
    rentPrice: 40000,
    features: ['High Ceiling', 'Loading Dock', 'Security Fence', 'Office Area'],
  },
  {
    id: '8',
    title: 'Elegant 5-Bedroom Villa',
    description: 'Luxurious villa with stunning views, infinity pool, and modern amenities.',
    type: 'house',
    price: 1500000,
    location: 'Ridge Area, Accra',
    city: 'Accra',
    bedrooms: 5,
    bathrooms: 4,
    area: 650,
    image: '/properties/villa-elegant.png',
    images: ['/properties/villa-elegant.png', '/properties/house-luxury.png', '/properties/house-luxury-2.png'],
    featured: true,
    agentId: '2',
    postedDate: '2024-06-09',
    forSale: true,
    forRent: false,
    features: ['Infinity Pool', 'Garden', 'Home Automation', 'Security System', 'Guest House'],
  },
  {
    id: '9',
    title: 'Studio Apartment - Perfect for Students',
    description: 'Affordable studio apartment close to universities and transportation.',
    type: 'apartment',
    price: 150000,
    location: 'Legon, Accra',
    city: 'Accra',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    image: '/properties/apartment-studio.png',
    images: ['/properties/apartment-studio.png', '/properties/apartment-cozy.png', '/properties/apartment-modern.png'],
    featured: false,
    agentId: '3',
    postedDate: '2024-06-16',
    forSale: true,
    forRent: true,
    rentPrice: 1500,
    features: ['University Nearby', 'WiFi', 'Furnished', 'Secure Gate'],
  },
  {
    id: '10',
    title: 'Retail Shop Front',
    description: 'Prime retail location with high visibility and foot traffic.',
    type: 'commercial',
    price: 500000,
    location: 'Makola Market, Accra',
    city: 'Accra',
    area: 150,
    image: '/properties/retail-shop.png',
    images: ['/properties/retail-shop.png', '/properties/commercial-prime.png', '/properties/office-executive.png'],
    featured: false,
    agentId: '1',
    postedDate: '2024-06-07',
    forSale: true,
    forRent: true,
    rentPrice: 8000,
    features: ['Market Location', 'High Traffic', 'Display Windows', 'Stockroom'],
  },
  {
    id: '11',
    title: 'Toyota Camry 2022',
    description: 'Well-maintained Toyota Camry with low mileage, leather interior, and full service history.',
    type: 'car',
    price: 185000,
    location: 'East Legon, Accra',
    city: 'Accra',
    area: 0,
    image: '/properties/car-camry-1.jpg',
    images: ['/properties/car-camry-1.jpg', '/properties/car-camry-2.jpg', '/properties/car-camry-3.jpg'],
    featured: true,
    agentId: '1',
    postedDate: '2024-06-10',
    forSale: true,
    forRent: false,
    features: ['Automatic', 'Leather Seats', 'Reverse Camera', 'Fuel Efficient'],
  },
  {
    id: '12',
    title: 'Honda CR-V 2021',
    description: 'Spacious SUV ideal for family use, with excellent road condition and updated features.',
    type: 'car',
    price: 220000,
    location: 'Airport Residential, Accra',
    city: 'Accra',
    area: 0,
    image: '/properties/car-crv-1.jpg',
    images: ['/properties/car-crv-1.jpg', '/properties/car-crv-2.jpg', '/properties/car-crv-3.jpg'],
    featured: true,
    agentId: '2',
    postedDate: '2024-06-12',
    forSale: true,
    forRent: true,
    rentPrice: 3500,
    features: ['SUV', 'AWD', 'Bluetooth', 'Sunroof'],
  },
  {
    id: '13',
    title: 'Hyundai Elantra 2020',
    description: 'Reliable sedan with great fuel economy, ideal for city commuting.',
    type: 'car',
    price: 95000,
    location: 'Tema Community 25',
    city: 'Tema',
    area: 0,
    image: '/properties/car-elantra-1.jpg',
    images: ['/properties/car-elantra-1.jpg', '/properties/car-elantra-2.jpg', '/properties/car-elantra-3.jpg'],
    featured: false,
    agentId: '3',
    postedDate: '2024-06-08',
    forSale: true,
    forRent: false,
    features: ['Manual', 'Air Conditioning', 'USB Ports', 'Clean Title'],
  },
];

// Mock Agents
export const agents: Agent[] = [
  {
    id: '1',
    name: 'John Mensah',
    phone: '+233 50 123 4567',
    email: 'john@propertyfinds.com',
    image: '/agents/agent-1.png',
    properties: 45,
    rating: 4.8,
    bio: 'Experienced real estate agent with 10+ years in the industry specializing in luxury properties.',
  },
  {
    id: '2',
    name: 'Sarah Agyeman',
    phone: '+233 55 987 6543',
    email: 'sarah@propertyfinds.com',
    image: '/agents/agent-2.png',
    properties: 38,
    rating: 4.7,
    bio: 'Dedicated agent focusing on residential properties and helping families find their dream homes.',
  },
  {
    id: '3',
    name: 'Michael Boateng',
    phone: '+233 24 456 7890',
    email: 'michael@propertyfinds.com',
    image: '/agents/agent-3.png',
    properties: 52,
    rating: 4.9,
    bio: 'Commercial real estate specialist with expertise in business properties and investments.',
  },
];

// Mock Testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Akosua Baah',
    role: 'Property Buyer',
    content: 'Property Finds made finding my dream home incredibly easy. The AI search feature saved me so much time!',
    image: '/testimonials/testimonial-1.png',
    rating: 5,
  },
  {
    id: '2',
    name: 'Kwame Asante',
    role: 'Business Owner',
    content: 'Found the perfect commercial space for my business. The team was professional and helpful throughout.',
    image: '/testimonials/testimonial-2.png',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ama Osei',
    role: 'Investment Consultant',
    content: 'Excellent platform for property investment. The price estimation tools are incredibly accurate.',
    image: '/testimonials/testimonial-3.png',
    rating: 4,
  },
];

// Mock Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 5 Tips for First-Time Home Buyers in Ghana',
    excerpt: 'Learn essential strategies to make your first property purchase a success.',
    content: 'Buying your first home is a major decision. Here are the top tips to guide you through the process...',
    image: '/blog/blog-1.png',
    date: '2024-06-20',
    author: 'John Mensah',
    category: 'Buying Guide',
  },
  {
    id: '2',
    title: 'Understanding Property Values in Accra',
    excerpt: 'Discover what factors influence real estate prices in the capital city.',
    content: 'Property values in Accra are influenced by multiple factors including location, amenities...',
    image: '/blog/blog-2.png',
    date: '2024-06-18',
    author: 'Michael Boateng',
    category: 'Market Analysis',
  },
  {
    id: '3',
    title: 'Investment Opportunities in Emerging Areas',
    excerpt: 'Explore high-potential areas for real estate investment.',
    content: 'Several emerging areas in Greater Accra show strong investment potential...',
    image: '/blog/blog-3.png',
    date: '2024-06-15',
    author: 'Sarah Agyeman',
    category: 'Investment',
  },
];

// City and Category Data
export const cities = ['Accra', 'Tema', 'Kumasi', 'Sekondi-Takoradi', 'Cape Coast'];

export const propertyCategories = [
  { id: 'house', name: 'Houses', icon: '🏠' },
  { id: 'apartment', name: 'Apartments', icon: '🏢' },
  { id: 'land', name: 'Lands', icon: '🌳' },
  { id: 'commercial', name: 'Commercial', icon: '🏬' },
  { id: 'office', name: 'Offices', icon: '💼' },
  { id: 'warehouse', name: 'Warehouses', icon: '📦' },
  { id: 'car', name: 'Cars', icon: '🚗' },
];

// AI-related helper functions
export function estimatePrice(
  type: Property['type'],
  area: number,
  bedrooms?: number
): number {
  // Base prices per property type
  const baseMultipliers: Record<Property['type'], number> = {
    house: 1500,
    apartment: 2000,
    land: 150,
    commercial: 1800,
    office: 2200,
    warehouse: 1000,
    car: 800,
  };

  let price = baseMultipliers[type] * area;

  // Adjust for bedrooms (apartments/houses)
  if (bedrooms) {
    price += bedrooms * 50000;
  }

  // Add random variation (+/- 15%)
  const variation = price * 0.15 * (Math.random() - 0.5) * 2;
  return Math.round(price + variation);
}

export function getComparableListings(property: Property): Property[] {
  return properties
    .filter(p => p.type === property.type && p.id !== property.id)
    .slice(0, 3);
}

export function generatePropertyDescription(property: Property): string {
  const features = property.features.slice(0, 3).join(', ');
  return `Stunning ${property.type} located in ${property.location}. This ${property.area}m² property features ${features} and is perfect for ${
    property.forSale && property.forRent ? 'sale or rent' : property.forSale ? 'sale' : 'rent'
  }. Contact our agent for more information.`;
}

export function parseNaturalLanguageSearch(query: string) {
  const result: any = {};

  // Extract bedrooms
  const bedroomMatch = query.match(/(\d+)\s*[-\s]?bedroom/i);
  if (bedroomMatch) {
    result.bedrooms = parseInt(bedroomMatch[1]);
  }

  // Extract price range
  const priceMatch = query.match(/(?:under|below|ghс|ghs)?\s*(\d+(?:,\d{3})*)/i);
  if (priceMatch) {
    result.maxPrice = parseInt(priceMatch[1].replace(/,/g, ''));
  }

  // Extract property type
  const types = ['house', 'apartment', 'land', 'commercial', 'office', 'warehouse', 'car'];
  for (const type of types) {
    if (query.toLowerCase().includes(type) || (type === 'car' && /\bcars?\b/i.test(query))) {
      result.type = type;
      break;
    }
  }

  // Extract location
  const cityMatch = cities.find(city => query.toLowerCase().includes(city.toLowerCase()));
  if (cityMatch) {
    result.city = cityMatch;
  }

  return result;
}
