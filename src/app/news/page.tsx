"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { listPublishedBlogPosts, type BlogPost } from "@/db/blogPost";
import { watchAllBlogCategories, type BlogCategory } from "@/db/blogCategory";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeaderBlue } from "@/components/HeaderBlue";
import { Footer } from "@/components/Footer";
import { NewsSkeleton } from "@/components/NewsSkeleton";

export default function NewsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const publishedPosts = await listPublishedBlogPosts(null);
        setPosts(publishedPosts);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = watchAllBlogCategories((nextCategories) => {
      setCategories(nextCategories);
    });

    return () => unsubscribe();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || post.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Catégorie";
  };

  if (loading) {
    return (
      <div
        className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
        id="head"
      >
        <HeaderBlue activeLink="news" />
        <main className="pt-32 pb-20">
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
              <NewsSkeleton />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <HeaderBlue activeLink="news" />
      <main className="pt-32 pb-20">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-8">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/news/${post.slug}`}>
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      {/* Featured Image */}
                      {post.featuredImageUrl && (
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <img
                            src={post.featuredImageUrl}
                            alt={post.title}
                            className="h-full w-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      )}

                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="line-clamp-2 text-lg">
                            {post.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">
                            {getCategoryName(post.categoryId)}
                          </Badge>
                          {post.publishedAt && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(post.publishedAt).toLocaleDateString(
                                "fr-FR",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4">
                          <span className="text-sm font-medium text-primary hover:underline">
                            Lire la suite →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Aucun article trouvé
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Essayez de modifier votre recherche ou votre filtre de
                    catégorie
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
