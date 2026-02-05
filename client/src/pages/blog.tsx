import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConsultationModal } from "@/components/consultation-modal";
import { getQueryFn } from "@/lib/queryClient";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { t, language } = useLanguage();
  
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const featuredPosts = blogPosts.filter((post: BlogPost) => post.featured && post.published);
  const regularPosts = blogPosts.filter((post: BlogPost) => !post.featured && post.published);

  // Blog listing view
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-inter font-bold text-4xl lg:text-5xl mb-6">
            {t("blogTitle")}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t("blogSubtitle")}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts?.map((post) => (
                <Card key={post.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <i className="fas fa-lightbulb text-white text-4xl"></i>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      {new Date(post.createdAt).toLocaleDateString(language === "fr" ? "fr-CA" : "en-CA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="w-full">
                        {t("readMore")}
                        <i className="fas fa-arrow-right ml-2"></i>
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {blogPosts && blogPosts.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-blog text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No blog posts yet</h3>
              <p className="text-gray-500">Check back soon for the latest insights on AI automation.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-inter font-bold text-3xl text-dark mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest insights on AI automation and business growth delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
