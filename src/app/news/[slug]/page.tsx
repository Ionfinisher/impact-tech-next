"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getBlogPostBySlug, type BlogPost } from "@/db/blogPost";
import { watchAllBlogCategories, type BlogCategory } from "@/db/blogCategory";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { HeaderBlue } from "@/components/HeaderBlue";

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { slug } = use(params);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const foundPost = await getBlogPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    const unsubscribe = watchAllBlogCategories((nextCategories) => {
      setCategories(nextCategories);
    });

    return () => unsubscribe();
  }, []);

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Catégorie";
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
        <p className="text-muted-foreground mb-6">
          Désolé, cet article n'existe pas ou a été supprimé.
        </p>
        <Link href="/news" className="text-primary hover:underline">
          ← Retour aux articles
        </Link>
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
          <div className="flex flex-1 flex-col gap-8 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto w-full">
              {/* Featured Image */}
              {post.featuredImageUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Title and Meta */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
                  <Badge variant="secondary">
                    {getCategoryName(post.categoryId)}
                  </Badge>

                  {post.publishedAt && (
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}

                  {post.createdAt && (
                    <span className="text-xs">
                      Mis à jour:{" "}
                      {new Date(
                        post.updatedAt || post.createdAt,
                      ).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-muted-foreground mb-8 italic">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto w-full blog-rich-content prose prose-sm dark:prose-invert">
              <div
                className="text-base leading-7 space-y-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Back Link */}
            <div className="max-w-3xl mx-auto w-full border-t pt-8">
              <Link href="/news" className="text-primary hover:underline">
                ← Retour aux articles
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
