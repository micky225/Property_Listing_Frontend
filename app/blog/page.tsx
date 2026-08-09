'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogPosts } from '@/lib/api'
import type { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/dateUtils'
import { Search } from 'lucide-react'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const posts = await getBlogPosts(searchQuery || undefined)
        setBlogPosts(posts)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [searchQuery])

  const categories = [...new Set(blogPosts.map(p => p.category))]
  const filteredPosts = selectedCategory
    ? blogPosts.filter(p => p.category === selectedCategory)
    : blogPosts

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Real Estate Blog</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Expert insights, market trends, and tips for buyers and sellers.
          </p>

          <div className="mb-12">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition ${
                  !selectedCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer h-full">
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6 flex flex-col">
                      <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium mb-3 w-fit">
                        {post.category}
                      </span>
                      <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
