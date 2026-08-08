'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getBlogPost, getBlogPosts } from '@/lib/api'
import type { BlogPost } from '@/lib/types'
import { formatDate } from '@/lib/dateUtils'
import { Share2, Calendar, User } from 'lucide-react'

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.id) return
    async function load() {
      try {
        const postData = await getBlogPost(params.id)
        setPost(postData)
        const all = await getBlogPosts()
        setRelatedPosts(all.filter(p => p.category === postData.category && p.id !== postData.id))
      } catch (err) {
        console.error(err)
        setPost(null)
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
          Loading post...
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
            <a href="/blog" className="text-primary hover:underline">
              Go back to blog
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Image */}
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden mb-8">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

            <div className="flex flex-wrap gap-6 text-muted-foreground mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-card rounded-lg p-8 shadow-md mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground leading-relaxed mb-6">{post.content}</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Understand market trends before making investment decisions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Work with experienced agents to get the best value.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <span className="text-foreground">Use AI tools for better property analysis and valuation.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">Get Started Today</h2>
              <p className="text-foreground">
                Ready to apply these insights to your property search? Browse our listings and connect with our agents today.
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
            <span className="text-muted-foreground">Share this article</span>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative h-48 bg-muted overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium mb-2">
                          {relatedPost.category}
                        </span>
                        <h3 className="font-bold text-lg line-clamp-2 mb-2">{relatedPost.title}</h3>
                        <p className="text-muted-foreground text-sm">{relatedPost.author}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
