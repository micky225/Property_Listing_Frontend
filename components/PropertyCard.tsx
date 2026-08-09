'use client'

import { Property } from '@/lib/types'
import { MapPin, Bed, Bath, Ruler, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const displayPrice = property.forSale
    ? property.price >= 1000000
      ? `₵${(property.price / 1000000).toFixed(1)}M`
      : `₵${(property.price / 1000).toFixed(0)}K`
    : property.rentPrice
      ? `₵${(property.rentPrice / 1000).toFixed(0)}K/mo`
      : `₵${(property.price / 1000).toFixed(0)}K`

  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1)

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-white transition duration-300 hover:border-primary/30 hover:shadow-[0_18px_40px_-24px_rgba(84,36,203,0.45)]">
        <div className="relative h-56 overflow-hidden bg-muted sm:h-60">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {property.featured && (
              <span className="bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-foreground">
                Featured
              </span>
            )}
            {property.forSale && (
              <span className="bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-foreground">
                Sale
              </span>
            )}
            {property.forRent && (
              <span className="bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                Rent
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div>
              <p className="font-display text-2xl font-semibold text-white">{displayPrice}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/75">
                {typeLabel}
              </p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center bg-white/15 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <div>
            <h3 className="font-display text-lg font-semibold leading-snug text-foreground transition group-hover:text-primary line-clamp-2">
              {property.title}
            </h3>
            <div className="mt-2 flex items-center text-muted-foreground">
              <MapPin className="mr-1.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          {property.description ? (
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {property.description}
            </p>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/70 pt-3 text-sm text-muted-foreground">
            {property.bedrooms != null && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-primary/80" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                </span>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-primary/80" />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                </span>
              </div>
            )}
            {property.area > 0 && (
              <div className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4 text-primary/80" />
                <span>{property.area}m²</span>
              </div>
            )}
          </div>

          {property.features?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {property.features.slice(0, 3).map(feature => (
                <span
                  key={feature}
                  className="bg-secondary/70 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
