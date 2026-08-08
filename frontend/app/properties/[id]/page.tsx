'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getAgent, getComparableProperties, getProperty } from '@/lib/api'
import type { Agent, Property } from '@/lib/types'
import { formatDate } from '@/lib/dateUtils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  Share2,
  Phone,
  Mail,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export default function PropertyDetailPage() {
  const params = useParams<{ id: string }>()
  const propertyId = params?.id
  const [property, setProperty] = useState<Property | null>(null)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [comparables, setComparables] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!propertyId) return

    async function load() {
      setLoading(true)
      try {
        const prop = await getProperty(propertyId)
        setProperty(prop)
        const [comps, agentData] = await Promise.all([
          getComparableProperties(propertyId),
          prop.agentId ? getAgent(prop.agentId) : Promise.resolve(null),
        ])
        setComparables(comps)
        setAgent(agentData)

        const saved = localStorage.getItem('savedProperties')
        if (saved) {
          setIsSaved(JSON.parse(saved).includes(prop.id))
        }
      } catch (err) {
        console.error(err)
        setProperty(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [propertyId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading property...
        </div>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property not found</h1>
            <Link href="/properties" className="text-primary hover:underline">
              Go back to properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const galleryImages =
    property.images.length >= 3
      ? property.images.slice(0, 3)
      : [
          ...property.images,
          ...Array.from({ length: Math.max(0, 3 - property.images.length) }, () => property.image),
        ]

  const handleSaveProperty = () => {
    const saved = localStorage.getItem('savedProperties') || '[]'
    let savedList: string[] = JSON.parse(saved)

    if (isSaved) {
      savedList = savedList.filter(id => id !== property.id)
    } else {
      savedList.push(property.id)
    }

    localStorage.setItem('savedProperties', JSON.stringify(savedList))
    setIsSaved(!isSaved)
  }

  const displayPrice = property.forSale
    ? property.price >= 1000000
      ? `₵${(property.price / 1000000).toFixed(1)}M`
      : `₵${(property.price / 1000).toFixed(0)}K`
    : `₵${(property.rentPrice! / 1000).toFixed(0)}K/mo`

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/properties" className="text-primary hover:underline text-sm mb-6 inline-block">
            ← Back to properties
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="relative h-80 md:h-[28rem] bg-muted rounded-lg overflow-hidden mb-4 group">
                <Image
                  src={galleryImages[selectedImage]}
                  alt={`${property.title} - image ${selectedImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  onClick={() =>
                    setSelectedImage(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-24 md:h-28 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? 'border-primary'
                        : 'border-transparent hover:border-primary/40'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${property.title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md h-fit border border-border">
              <div className="text-4xl font-bold text-primary mb-4">{displayPrice}</div>
              {property.featured && (
                <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  Featured
                </div>
              )}
              <h1 className="text-2xl font-bold text-foreground mb-4">{property.title}</h1>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{property.location}</p>
                  </div>
                </div>
                {property.bedrooms && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Bed className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Bath className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Ruler className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Area</p>
                      <p className="font-semibold">{property.area} m²</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-6">
                {property.forSale && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                    For Sale
                  </span>
                )}
                {property.forRent && (
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded text-sm font-medium">
                    For Rent
                  </span>
                )}
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={handleSaveProperty}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition ${
                    isSaved
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>

              {agent && (
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Listed by</p>
                  <div className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{agent.name}</h4>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(agent.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{agent.rating}/5</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <a
                      href={`tel:${agent.phone}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                      <Phone className="w-4 h-4" />
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-lg hover:bg-secondary/90 transition"
                    >
                      <Mail className="w-4 h-4" />
                      Email Agent
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6 shadow-md mb-8 border border-border">
                <h2 className="text-2xl font-bold mb-4">About this listing</h2>
                <p className="text-foreground leading-relaxed mb-6">{property.description}</p>
                {property.features.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-4">Features & Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {property.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {comparables.length > 0 && (
                <div className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {comparables.map(comparable => (
                      <PropertyCard key={comparable.id} property={comparable} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="bg-secondary/20 rounded-lg p-6 shadow-md border border-border">
                <h3 className="font-bold text-lg mb-4">Listing Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold text-foreground capitalize">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-semibold text-foreground">{property.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Posted Date</p>
                    <p className="font-semibold text-foreground">{formatDate(property.postedDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Listing ID</p>
                    <p className="font-semibold text-foreground font-mono">{property.id}</p>
                  </div>
                  {property.forSale && (
                    <div>
                      <p className="text-sm text-muted-foreground">Sale Price</p>
                      <p className="font-semibold text-foreground">₵{property.price.toLocaleString()}</p>
                    </div>
                  )}
                  {property.forRent && property.rentPrice && (
                    <div>
                      <p className="text-sm text-muted-foreground">Rent Price</p>
                      <p className="font-semibold text-foreground">
                        ₵{property.rentPrice.toLocaleString()}/mo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
