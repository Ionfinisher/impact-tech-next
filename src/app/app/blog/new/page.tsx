"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  createBlogPost,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from "@/db/blogPost";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { BlogEditorForm } from "../BlogEditorForm";

export default function NewBlogPostPage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    setTitle("Créer un article");
  }, [setTitle]);

  const handleCreateBlogPost = async (
    payload: CreateBlogPostInput | UpdateBlogPostInput,
  ) => {
    await createBlogPost(payload as CreateBlogPostInput);
    router.push("/app/blog");
  };

  if (authLoading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <div>Non authentifié</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <BlogEditorForm mode="create" onSubmitAction={handleCreateBlogPost} />
      </div>
    </div>
  );
}
