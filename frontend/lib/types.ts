export interface Property {
  id: string
  title: string
  description: string
  type: 'house' | 'apartment' | 'land' | 'commercial' | 'office' | 'warehouse' | 'car'
  price: number
  location: string
  city: string
  bedrooms?: number
  bathrooms?: number
  area: number
  image: string
  images: string[]
  featured: boolean
  agentId: string
  postedDate: string
  forSale: boolean
  forRent: boolean
  rentPrice?: number
  features: string[]
}

export interface Agent {
  id: string
  name: string
  phone: string
  email: string
  image: string
  properties: number
  rating: number
  bio: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  image: string
  rating: number
}

export type PropertyCategory = {
  id: string
  name: string
  icon: string
}

export function estimatePrice(
  type: Property['type'],
  area: number,
  bedrooms?: number
): number {
  const baseMultipliers: Record<Property['type'], number> = {
    house: 1500,
    apartment: 2000,
    land: 150,
    commercial: 1800,
    office: 2200,
    warehouse: 1000,
    car: 800,
  }

  let price = baseMultipliers[type] * area

  if (bedrooms) {
    price += bedrooms * 50000
  }

  const variation = price * 0.15 * (Math.random() - 0.5) * 2
  return Math.round(price + variation)
}

export function parseNaturalLanguageSearch(query: string, cities: string[] = []) {
  const result: {
    bedrooms?: number
    maxPrice?: number
    type?: string
    city?: string
  } = {}

  const bedroomMatch = query.match(/(\d+)\s*[-\s]?bedroom/i)
  if (bedroomMatch) {
    result.bedrooms = parseInt(bedroomMatch[1], 10)
  }

  const priceMatch = query.match(/(?:under|below|ghс|ghs)?\s*(\d+(?:,\d{3})*)/i)
  if (priceMatch) {
    result.maxPrice = parseInt(priceMatch[1].replace(/,/g, ''), 10)
  }

  const types = ['house', 'apartment', 'land', 'commercial', 'office', 'warehouse', 'car']
  for (const type of types) {
    if (query.toLowerCase().includes(type) || (type === 'car' && /\bcars?\b/i.test(query))) {
      result.type = type
      break
    }
  }

  const cityMatch = cities.find(city => query.toLowerCase().includes(city.toLowerCase()))
  if (cityMatch) {
    result.city = cityMatch
  }

  return result
}
