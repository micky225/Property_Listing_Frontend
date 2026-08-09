import type { Agent, BlogPost, Property, Testimonial } from './types'

/**
 * Prefer NEXT_PUBLIC_API_URL (production Render URL, etc.).
 * Only fall back to same-host:8000 when developing on a LAN IP against local Django.
 */
function getApiBase() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  const configuredIsRemote =
    !!configured && !configured.includes('127.0.0.1') && !configured.includes('localhost')

  if (configuredIsRemote) {
    return configured
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1'
    if (!isLocalHost) {
      return `${protocol}//${hostname}:8000/api`
    }
  }

  if (configured) return configured

  throw new Error(
    'NEXT_PUBLIC_API_URL is not set. Add it to frontend/.env.local (e.g. https://poperty-listing-backend.onrender.com/api).'
  )
}

function isRemoteApi(base: string) {
  return base.startsWith('https://') || (!base.includes('127.0.0.1') && !base.includes('localhost'))
}

async function fetchOnce<T>(base: string, path: string, init?: RequestInit): Promise<T> {
  // Render free tier can take 30–60s to wake from sleep
  const timeoutMs = isRemoteApi(base) ? 60000 : 15000
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
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
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
        `API timed out after ${timeoutMs / 1000}s (${path}). The Render backend may be waking up — refresh in a moment.`
      )
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBase()

  try {
    return await fetchOnce<T>(base, path, init)
  } catch (err) {
    // One retry helps after a cold start on Render
    if (isRemoteApi(base) && err instanceof Error && /timed out|Failed to fetch|NetworkError/i.test(err.message)) {
      return await fetchOnce<T>(base, path, init)
    }
    throw err
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
