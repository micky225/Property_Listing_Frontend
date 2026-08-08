'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { getProperties } from '@/lib/api'
import type { Property } from '@/lib/types'
import { Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function SavedPropertiesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [savedProperties, setSavedProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const saved = localStorage.getItem('savedProperties')
      const ids: string[] = saved ? JSON.parse(saved) : []
      setSavedIds(ids)

      if (ids.length === 0) {
        setSavedProperties([])
        setIsLoading(false)
        return
      }

      try {
        const all = await getProperties()
        setSavedProperties(all.filter(p => ids.includes(p.id)))
      } catch (err) {
        console.error(err)
        setSavedProperties([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleRemove = (id: string) => {
    const updated = savedIds.filter(savedId => savedId !== id)
    setSavedIds(updated)
    setSavedProperties(savedProperties.filter(p => p.id !== id))
    localStorage.setItem('savedProperties', JSON.stringify(updated))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved properties?')) {
      setSavedIds([])
      setSavedProperties([])
      localStorage.removeItem('savedProperties')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-primary fill-current" />
              <h1 className="text-4xl font-bold">Saved Properties</h1>
            </div>
            {savedProperties.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 text-destructive hover:text-destructive/80 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {savedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map(property => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} />
                  <button
                    onClick={() => handleRemove(property.id)}
                    className="absolute top-4 left-4 bg-card text-destructive p-2 rounded-full shadow-md hover:bg-muted transition z-10"
                    aria-label="Remove saved property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg border border-border">
              <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No saved properties yet</h2>
              <p className="text-muted-foreground mb-6">
                Save properties you like to find them here later.
              </p>
              <Link
                href="/properties"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
