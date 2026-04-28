"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getBlogPostById,
  updateBlogPost,
  type UpdateBlogPostInput,
  type CreateBlogPostInput,
  type BlogPost,
} from "@/db/blogPost";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { BlogEditorForm } from "../../BlogEditorForm";
import { Spinner } from "@/components/ui/spinner";

export default function EditBlogPostPage({
  params,
}: {
  params: { blogPostId: string };
}) {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("Éditer l'article");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    const loadPost = async () => {
      try {
        const post = await getBlogPostById(params.blogPostId);
        setBlogPost(post);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [authLoading, user, params.blogPostId]);

  const handleUpdateBlogPost = async (
    payload: CreateBlogPostInput | UpdateBlogPostInput,
  ) => {
    await updateBlogPost(params.blogPostId, payload as UpdateBlogPostInput);
    router.push("/app/blog");
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (!user || !blogPost) {
    return <div>Article non trouvé ou non authentifié</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <BlogEditorForm
          mode="edit"
          initialData={blogPost}
          onSubmitAction={handleUpdateBlogPost}
        />
      </div>
    </div>
  );
}
