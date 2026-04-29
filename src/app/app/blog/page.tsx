"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  deleteBlogPost,
  watchAllBlogPosts,
  type BlogPost,
} from "@/db/blogPost";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { BlogPostDataTable } from "./dataTable";
import { TableSkeleton } from "@/components/TableSkeleton";

export default function BlogPage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    setTitle("Articles du blog");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setBlogPosts([]);
      setPostsLoading(false);
      return;
    }

    setPostsLoading(true);
    setPostsError(null);

    const unsubscribe = watchAllBlogPosts(
      (nextPosts) => {
        setBlogPosts(nextPosts);
        setPostsLoading(false);
      },
      () => {
        setPostsError("Impossible de charger les articles.");
        setPostsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  const handleDeleteBlogPost = async (blogPostId: string) => {
    setIsMutating(true);
    try {
      await deleteBlogPost(blogPostId);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div>
              {postsError && (
                <div className="text-sm text-destructive">{postsError}</div>
              )}
            </div>
            <Link href="/app/blog/new">
              <Button>
                <IconPlus className="mr-2 size-4" />
                Créer un article
              </Button>
            </Link>
          </div>
          {authLoading || postsLoading ? (
            <TableSkeleton />
          ) : (
            <div className="px-4 lg:px-6">
              <BlogPostDataTable
                data={blogPosts}
                isMutating={isMutating}
                onDeleteAction={handleDeleteBlogPost}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
