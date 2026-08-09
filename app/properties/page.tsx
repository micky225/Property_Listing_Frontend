'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { getMeta, getProperties } from '@/lib/api'
import type { Property, PropertyCategory } from '@/lib/types'

function PropertiesPageContent() {
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get('type')
  const cityFilter = searchParams.get('city')

  const [selectedType, setSelectedType] = useState<string | null>(typeFilter)
  const [selectedCity, setSelectedCity] = useState<string | null>(cityFilter)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
  const [bedroomFilter, setBedroomFilter] = useState<number | null>(null)
  const [forSaleOnly, setForSaleOnly] = useState(false)
  const [forRentOnly, setForRentOnly] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [propertyCategories, setPropertyCategories] = useState<PropertyCategory[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setSelectedType(typeFilter)
  }, [typeFilter])

  useEffect(() => {
    setSelectedCity(cityFilter)
  }, [cityFilter])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [props, meta] = await Promise.all([
          getProperties({
            type: selectedType,
            city: selectedCity,
            bedrooms: bedroomFilter,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            forSale: forSaleOnly || undefined,
            forRent: forRentOnly || undefined,
          }),
          getMeta(),
        ])
        setProperties(props)
        setPropertyCategories(meta.propertyCategories)
        setCities(meta.cities)
      } catch (err) {
        console.error(err)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedType, selectedCity, priceRange, bedroomFilter, forSaleOnly, forRentOnly])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-8">Browse Properties</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-md sticky top-20">
                <h3 className="font-bold text-lg mb-6">Filters</h3>

                <div className="mb-6">
                  <label className="font-semibold text-sm mb-3 block">Property Type</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedType(null)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        !selectedType
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      All Types
                    </button>
                    {propertyCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedType(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded transition ${
                          selectedType === cat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-semibold text-sm mb-3 block">City</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCity(null)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        !selectedCity
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      All Cities
                    </button>
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`w-full text-left px-3 py-2 rounded transition ${
                          selectedCity === city
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-semibold text-sm mb-3 block">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000000"
                      step="50000"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground">
                      ₵0 - ₵{(priceRange[1] / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="font-semibold text-sm mb-3 block">Bedrooms</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setBedroomFilter(null)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        !bedroomFilter
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      Any
                    </button>
                    {[1, 2, 3, 4, 5].map(bed => (
                      <button
                        key={bed}
                        onClick={() => setBedroomFilter(bed)}
                        className={`w-full text-left px-3 py-2 rounded transition ${
                          bedroomFilter === bed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {bed}+ Bedrooms
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-sm mb-3 block">Purpose</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forSaleOnly}
                        onChange={e => setForSaleOnly(e.target.checked)}
                      />
                      <span className="text-sm">For Sale</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={forRentOnly}
                        onChange={e => setForRentOnly(e.target.checked)}
                      />
                      <span className="text-sm">For Rent</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {loading ? 'Loading...' : `Showing ${properties.length} properties`}
                </p>
              </div>

              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading properties...</div>
              ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-lg">
                  <p className="text-xl text-muted-foreground mb-4">No properties match your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedType(null)
                      setSelectedCity(null)
                      setPriceRange([0, 5000000])
                      setBedroomFilter(null)
                      setForSaleOnly(false)
                      setForRentOnly(false)
                    }}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
          <Footer />
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  )
}
