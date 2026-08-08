import type { Agent, BlogPost, Property, Testimonial } from './types'

/**
 * Prefer NEXT_PUBLIC_API_URL; when the UI is opened via a LAN IP, use the same
 * host on port 8000 so phones/other devices can reach Django.
 */
function getApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1'
    if (!isLocalHost) {
      return `${protocol}//${hostname}:8000/api`
    }
  }

  if (configured) return configured

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    return `${protocol}//${hostname}:8000/api`
  }

  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. Add it to frontend/.env.local (e.g. http://127.0.0.1:8000/api).'
  )
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBase()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const method = (init?.method || 'GET').toUpperCase()

  try {
    const headers: HeadersInit = {
      Accept: 'application/json',
      ...(init?.headers || {}),
    }
    if (method !== 'GET' && method !== 'HEAD') {
      ;(headers as Record<string, string>)['Content-Type'] = 'application/json'
    }

    const res = await fetch(`${base}${path}`, {
      ...init,
      method,
      signal: controller.signal,
      headers,
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${path}`)
    }

    return await res.json()
  } finally {
    clearTimeout(timeout)
  }
}

export type PropertyFilters = {
  type?: string | null
  city?: string | null
  featured?: boolean
  agentId?: string | null
  forSale?: boolean
  forRent?: boolean
  minPrice?: number
  maxPrice?: number
  bedrooms?: number | null
  search?: string
}

function toQuery(filters: PropertyFilters = {}) {
  const params = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    params.set(key, String(value))
  })
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

export async function getProperties(filters: PropertyFilters = {}) {
  return apiFetch<Property[]>(`/properties/${toQuery(filters)}`)
}

export async function getProperty(id: string) {
  return apiFetch<Property>(`/properties/${id}/`)
}

export async function getComparableProperties(id: string) {
  return apiFetch<Property[]>(`/properties/${id}/comparables/`)
}

export async function getAgents() {
  return apiFetch<Agent[]>('/agents/')
}

export async function getAgent(id: string) {
  return apiFetch<Agent>(`/agents/${id}/`)
}

export async function getBlogPosts(search?: string) {
  const qs = search ? `?search=${encodeURIComponent(search)}` : ''
  return apiFetch<BlogPost[]>(`/blog-posts/${qs}`)
}

export async function getBlogPost(id: string) {
  return apiFetch<BlogPost>(`/blog-posts/${id}/`)
}

export async function getTestimonials() {
  return apiFetch<Testimonial[]>('/testimonials/')
}

export async function getMeta() {
  return apiFetch<{
    cities: string[]
    propertyCategories: { id: string; name: string; icon: string }[]
  }>('/meta/')
}
