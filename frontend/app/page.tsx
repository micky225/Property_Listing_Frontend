'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Search, Star } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { getMeta, getProperties, getTestimonials } from '@/lib/api'
import { parseNaturalLanguageSearch } from '@/lib/types'
import type { Property, PropertyCategory, Testimonial } from '@/lib/types'

const CATEGORY_IMAGES: Record<string, string> = {
  house: '/properties/house-luxury.png',
  apartment: '/properties/apartment-modern.png',
  land: '/properties/land-residential.png',
  commercial: '/properties/commercial-prime.png',
  office: '/properties/office-executive.png',
  warehouse: '/properties/warehouse-industrial.png',
  car: '/properties/car-camry-1.jpg',
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [propertyCategories, setPropertyCategories] = useState<PropertyCategory[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [props, testimonialList, meta] = await Promise.all([
          getProperties(),
          getTestimonials(),
          getMeta(),
        ])
        setProperties(props)
        setFilteredProperties(props)
        setTestimonials(testimonialList)
        setPropertyCategories(meta.propertyCategories)
        setCities(meta.cities)
      } catch (err) {
        console.error(err)
        setError(
          'Could not load listings. Start Django with: python manage.py runserver 0.0.0.0:8000'
        )
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setFilteredProperties(properties)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const searchParams = parseNaturalLanguageSearch(searchQuery, cities)

    try {
      const results = await getProperties({
        type: searchParams.type,
        city: searchParams.city,
        bedrooms: searchParams.bedrooms,
        maxPrice: searchParams.maxPrice,
      })
      setFilteredProperties(results)
    } catch {
      let results = properties
      if (searchParams.type) results = results.filter(p => p.type === searchParams.type)
      if (searchParams.city) {
        results = results.filter(p => p.city.toLowerCase() === searchParams.city!.toLowerCase())
      }
      if (searchParams.bedrooms) results = results.filter(p => p.bedrooms === searchParams.bedrooms)
      if (searchParams.maxPrice) results = results.filter(p => p.price <= searchParams.maxPrice!)
      setFilteredProperties(results)
    }
  }

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6)
  const latestListings = [...properties].slice(0, 6)
  const cityCounts = cities.map(city => ({
    city,
    count: properties.filter(p => p.city.toLowerCase() === city.toLowerCase()).length,
  }))

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading listings...
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {error && (
        <div className="bg-destructive/10 text-destructive text-center px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Hero: brand + headline + search only — no hint copy */}
      <section className="relative min-h-[88svh] md:min-h-[92vh] overflow-hidden">
        <Image
          src="/hero-accra.jpg"
          alt="Residential street in Accra"
          fill
          className="object-cover home-hero-image"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1140]/80 via-[#1a1140]/40 to-[#1a1140]/25" />

        <div className="relative z-10 min-h-[88svh] md:min-h-[92vh] flex flex-col justify-end md:justify-center px-4 sm:px-6 lg:px-8 pb-16 md:pb-0">
          <div className="max-w-3xl w-full text-white">
            <p className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight mb-4">
              Property Finds
            </p>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-white/95 mb-8 max-w-xl">
              Homes, land &amp; more across Ghana
            </h1>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl"
            >
              <label className="sr-only" htmlFor="home-search">
                Search properties
              </label>
              <input
                id="home-search"
                type="text"
                placeholder="Search location, type, or price..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 px-5 py-4 bg-white text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 font-medium hover:bg-primary/90 transition whitespace-nowrap"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {isSearching && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">Search results</h2>
              <p className="text-muted-foreground mt-1">
                {filteredProperties.length}{' '}
                {filteredProperties.length === 1 ? 'listing' : 'listings'} found
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('')
                setIsSearching(false)
                setFilteredProperties(properties)
              }}
              className="text-primary font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-xl text-muted-foreground mb-6">No properties matched that search.</p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition"
              >
                Browse all listings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>
      )}

      {!isSearching && (
        <>
          <section className="py-16 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-semibold">Explore by type</h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Scroll through listing types — tap one to browse.
              </p>
            </div>

            <div className="category-rail flex gap-4 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 snap-x snap-mandatory">
              {propertyCategories.map(category => {
                const count = properties.filter(p => p.type === category.id).length
                const image = CATEGORY_IMAGES[category.id] || '/properties/house-luxury.png'
                return (
                  <Link
                    key={category.id}
                    href={`/properties?type=${category.id}`}
                    className="group relative shrink-0 w-[72vw] sm:w-56 md:w-64 aspect-[3/4] snap-start overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Image
                      src={image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 72vw, 256px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1140]/90 via-[#1a1140]/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="font-display text-2xl font-semibold leading-tight">
                        {category.name}
                      </p>
                      <p className="text-sm text-white/75 mt-1">
                        {count} {count === 1 ? 'listing' : 'listings'}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          <section className="border-y border-border/80 bg-white/60 py-12 md:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Popular cities
              </h2>
              <p className="text-muted-foreground mb-8">Jump straight into a local market.</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {cityCounts.map(({ city, count }) => (
                  <li key={city}>
                    <Link
                      href={`/properties?city=${encodeURIComponent(city)}`}
                      className="group inline-flex items-baseline gap-2 text-foreground hover:text-primary transition"
                    >
                      <MapPin className="w-4 h-4 text-primary shrink-0 translate-y-0.5" />
                      <span className="font-display text-xl md:text-2xl font-medium group-hover:underline underline-offset-4 decoration-primary/40">
                        {city}
                      </span>
                      <span className="text-sm text-muted-foreground">{count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  Featured listings
                </h2>
                <p className="text-muted-foreground mt-2">Hand-picked places worth a closer look.</p>
              </div>
              <Link
                href="/properties"
                className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:underline"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>

          <section className="bg-[#1a1140] text-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-4 mb-10">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold">Just listed</h2>
                  <p className="text-white/65 mt-2">Fresh on the market.</p>
                </div>
                <Link
                  href="/properties"
                  className="hidden sm:inline-flex items-center gap-1 text-white/90 font-medium hover:underline"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestListings.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 w-full">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
              What clients say
            </h2>
            <p className="text-muted-foreground mb-12 max-w-lg">
              Real stories from buyers and investors who found their match.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {testimonials.map(testimonial => (
                <blockquote key={testimonial.id} className="border-l-2 border-primary pl-5">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonial.rating ? 'fill-primary text-primary' : 'text-border'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-display text-lg leading-relaxed text-foreground mb-6">
                    “{testimonial.content}”
                  </p>
                  <footer className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <cite className="not-italic font-medium text-foreground">
                        {testimonial.name}
                      </cite>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          <section className="relative overflow-hidden py-20 md:py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#6837d5] to-accent" />
            <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
              <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
                Have a property to list?
              </h2>
              <p className="text-lg text-white/85 mb-8">
                Reach buyers and renters across Ghana with Property Finds.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 font-semibold hover:bg-white/90 transition"
              >
                Start browsing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}
