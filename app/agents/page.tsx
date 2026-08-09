'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAgents, getProperties } from '@/lib/api'
import type { Agent, Property } from '@/lib/types'
import { Star, Phone, Mail, Home } from 'lucide-react'

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [agentList, props] = await Promise.all([getAgents(), getProperties()])
        setAgents(agentList)
        setProperties(props)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Our Agents</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Meet our experienced team of real estate professionals dedicated to helping you find
            your perfect property.
          </p>

          {loading ? (
            <p className="text-muted-foreground">Loading agents...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map(agent => {
                const agentProperties = properties.filter(p => p.agentId === agent.id)
                return (
                  <Link key={agent.id} href={`/agents/${agent.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer h-full">
                      <div className="relative h-80 bg-muted overflow-hidden">
                        <Image
                          src={agent.image}
                          alt={agent.name}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{agent.name}</h2>

                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(agent.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-muted'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">{agent.rating}/5</span>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{agent.bio}</p>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Home className="w-4 h-4 text-primary" />
                            <span>{agentProperties.length} active listings</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>{agent.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>{agent.email}</span>
                          </div>
                        </div>

                        <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition font-semibold">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
