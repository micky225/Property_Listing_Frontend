'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import { getAgent, getProperties } from '@/lib/api'
import type { Agent, Property } from '@/lib/types'
import { Star, Phone, Mail, MapPin } from 'lucide-react'

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [agentProperties, setAgentProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.id) return
    async function load() {
      try {
        const [agentData, props] = await Promise.all([
          getAgent(params.id),
          getProperties({ agentId: params.id }),
        ])
        setAgent(agentData)
        setAgentProperties(props)
      } catch (err) {
        console.error(err)
        setAgent(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params?.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading agent...
        </div>
        <Footer />
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Agent not found</h1>
            <a href="/agents" className="text-primary hover:underline">
              Go back to agents
            </a>
          </div>
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
          {/* Agent Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-6">
                <Image src={agent.image} alt={agent.name} fill className="object-cover" priority />
              </div>

              <div className="bg-card rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-4">{agent.name}</h2>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(agent.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{agent.rating}/5</span>
                </div>

                <div className="space-y-4 mb-6 border-y border-border py-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Properties Listed</p>
                      <p className="font-semibold">{agent.properties}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold text-sm">{agent.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold text-sm break-all">{agent.email}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-semibold mb-2">
                  Call {agent.name.split(' ')[0]}
                </button>
                <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/90 transition font-semibold">
                  Send Message
                </button>
              </div>
            </div>

            {/* About Section */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg p-8 shadow-md mb-8">
                <h3 className="text-2xl font-bold mb-4">About</h3>
                <p className="text-foreground leading-relaxed mb-6">{agent.bio}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-2xl font-bold text-primary">10+ Years</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Successful Sales</p>
                    <p className="text-2xl font-bold text-accent">500+</p>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                    <p className="text-2xl font-bold text-secondary">98%</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Average Deal Time</p>
                    <p className="text-2xl font-bold text-foreground">28 Days</p>
                  </div>
                </div>

                <h4 className="font-bold text-lg mb-4">Specialties</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Luxury Properties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Residential Homes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Commercial Real Estate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Investment Properties</span>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold mb-6">Recent Client Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="relative w-10 h-10 rounded-full bg-muted"></div>
                        <div>
                          <p className="font-semibold">Satisfied Client</p>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        "Excellent service! {agent.name} helped us find the perfect property within our budget. Highly recommended!"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Agent's Properties */}
          <div>
            <h3 className="text-3xl font-bold mb-8">
              {agent.name}&apos;s Properties ({agentProperties.length})
            </h3>
            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">No properties listed by this agent currently.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
