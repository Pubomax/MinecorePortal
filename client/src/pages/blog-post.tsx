import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsultationModal } from "@/components/consultation-modal";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function BlogPost() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();

  const { data: post, isLoading, error } = useQuery({
    queryKey: [`/api/blog/${slug}`],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!slug,
  });

  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter related posts (same category, excluding current post)
  const related = relatedPosts
    .filter((p: BlogPost) => p.category === post.category && p.slug !== post.slug && p.published)
    .slice(0, 3);

  // Convert markdown-style content to JSX
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="font-display text-4xl font-bold mb-6 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="font-display text-3xl font-bold mb-4 mt-8">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="font-display text-2xl font-bold mb-3 mt-6">{line.substring(4)}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold mb-4">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="mb-2">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="mb-4">
                ← Back to Blog
              </Button>
            </Link>
            <div className="flex items-center space-x-4 mb-4">
              <Badge>{post.category}</Badge>
              <span className="text-sm text-gray-500">{post.readTime}</span>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex items-center space-x-4">
            <span className="font-medium">By {post.author}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {formatContent(post.content)}
          </div>

          {/* CTA within article */}
          <Card className="my-12 bg-black text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-display text-2xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-300 mb-6">
                Get a personalized automation strategy for your business. Book your free consultation today.
              </p>
              <ConsultationModal 
                triggerText="Book Free Consultation"
                className="bg-white text-black hover:bg-gray-100 px-6 py-3 font-semibold"
              />
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-center mb-12">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((relatedPost: BlogPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{relatedPost.category}</Badge>
                      <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
            Start Your Automation Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of businesses that have transformed their operations with smart automation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ConsultationModal 
              triggerText="Get Free Assessment"
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            />
            <Link href="/blog">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold"
              >
                More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.metaDescription,
            "author": {
              "@type": "Organization",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Minecore Group"
            },
            "datePublished": post.createdAt,
            "dateModified": post.updatedAt,
            "keywords": post.keywords
          })
        }}
      />
    </div>
  );
}