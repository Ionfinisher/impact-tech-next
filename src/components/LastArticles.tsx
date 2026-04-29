"use client";

import { useEffect, useState } from "react";
import { listPublishedBlogPosts, type BlogPost } from "@/db/blogPost";
import { watchAllBlogCategories, type BlogCategory } from "@/db/blogCategory";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { NewsSkeleton } from "@/components/NewsSkeleton";

export function LastArticles() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const publishedPosts = await listPublishedBlogPosts(3);
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

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Catégorie";
  };

  const formatDate = (value: string | null) => {
    if (!value) {
      return "";
    }

    return new Date(value).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <NewsSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-background-light dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col group"
            >
              <div className="overflow-hidden">
                <Image
                  width={300}
                  height={200}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  src={post.featuredImageUrl || "/images/placeholder-blog.jpg"}
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-blue-950 dark:text-white group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                  <span> / </span>
                  <span>{getCategoryName(post.categoryId)}</span>
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-300 grow">
                  {post.excerpt}
                </p>
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-2 bg-blue-950 text-white rounded-full text-center font-medium hover:bg-primary hover:text-[#c2a356] transition-colors w-full sm:w-auto"
                >
                  <span>Lire plus</span>
                  <ArrowRightIcon
                    size={32}
                    weight="duotone"
                    className="text-white hover:text-[#c2a356]"
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Aucun article publié pour le moment.
          </div>
        )}
      </div>
      <div className="text-center mt-12">
        <Link
          className="font-medium text-blue-950 dark:text-gray-200 hover:text-primary dark:hover:text-primary border-b-2 border-transparent hover:border-[#0d1b33] pb-1 transition-all"
          href="/news"
        >
          Voir plus d'actualités
        </Link>
      </div>
    </>
  );
}
