"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from "@/db/blogPost";
import { watchAllBlogCategories, type BlogCategory } from "@/db/blogCategory";
import { storage } from "@/lib/firebase.browser";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import "../../../../public/css/titptap.css";
import { MenuBar } from "./MenuBar";

export interface BlogEditorFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    featuredImageUrl?: string | null;
    categoryId?: string;
    status?: "draft" | "published";
    metaDescription?: string | null;
    metaKeywords?: string | null;
  };
  onSubmitAction: (
    payload: CreateBlogPostInput | UpdateBlogPostInput,
  ) => Promise<void>;
}

export function BlogEditorForm({
  mode,
  initialData,
  onSubmitAction,
}: BlogEditorFormProps) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const contentImageInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    featuredImageUrl: initialData?.featuredImageUrl ?? null,
    categoryId: initialData?.categoryId ?? "",
    status: (initialData?.status ?? "draft") as "draft" | "published",
    metaDescription: initialData?.metaDescription ?? null,
    metaKeywords: initialData?.metaKeywords ?? null,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      Image.configure({
        HTMLAttributes: {
          class: "mx-auto my-4 h-auto max-w-full rounded-md",
          loading: "lazy",
        },
      }),
    ],
    content: formData.content || "<p></p>",
    onUpdate: ({ editor: currentEditor }) => {
      setFormData((prev) => ({
        ...prev,
        content: currentEditor.getHTML(),
      }));
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[260px] focus:outline-none dark:prose-invert",
      },
    },
  });

  useEffect(() => {
    const unsubscribe = watchAllBlogCategories((nextCategories) => {
      setCategories(nextCategories);
    });

    return () => unsubscribe();
  }, []);

  const uploadImageIfNeeded = useCallback(
    async (file: File | null): Promise<string | null> => {
      if (!file) {
        return formData.featuredImageUrl;
      }

      const storageRef = ref(storage, `blog/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    },
    [formData.featuredImageUrl],
  );

  const uploadContentImage = useCallback(
    async (file: File): Promise<string> => {
      const safeName = file.name.replace(/\s+/g, "-");
      const storageRef = ref(storage, `blog/content/${Date.now()}_${safeName}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    },
    [],
  );

  const handleContentImageSelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide.");
      return;
    }

    if (!editor) {
      toast.error("L'éditeur n'est pas prêt. Réessayez dans un instant.");
      return;
    }

    setIsUploadingContentImage(true);
    try {
      const imageUrl = await uploadContentImage(file);
      editor.chain().focus().setImage({ src: imageUrl, alt: file.name }).run();
      toast.success("Image insérée dans le contenu.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Impossible d'insérer l'image.";
      toast.error(message);
    } finally {
      setIsUploadingContentImage(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.length) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setLocalPreviewUrl(url);
        setSelectedFile(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setLocalPreviewUrl(url);
        setSelectedFile(file);
      }
    }
  };

  const currentImagePreview =
    localPreviewUrl ?? (formData.featuredImageUrl as string | null);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const plainContent = (
      editor?.getText() ?? formData.content.replace(/<[^>]*>/g, " ")
    ).trim();
    const hasImageContent = /<img\b/i.test(formData.content);

    if (!formData.title.trim()) errors.title = "Le titre est requis.";
    if (!formData.slug.trim()) errors.slug = "Le slug est requis.";
    if (!formData.excerpt.trim()) errors.excerpt = "L'extrait est requis.";
    if (!plainContent && !hasImageContent)
      errors.content = "Le contenu est requis.";
    if (!formData.categoryId.trim())
      errors.categoryId = "La catégorie est requise.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let imageUrl = formData.featuredImageUrl;

      if (selectedFile) {
        imageUrl = await uploadImageIfNeeded(selectedFile);
      }

      const payload = {
        ...formData,
        featuredImageUrl: imageUrl,
      };

      const saveTimeout = window.setTimeout(() => {
        toast.error(
          "La sauvegarde prend trop de temps. Vérifiez votre connexion puis réessayez.",
        );
      }, 30000);

      try {
        await Promise.race([
          onSubmitAction(payload),
          new Promise<never>((_, reject) => {
            window.setTimeout(
              () => reject(new Error("La sauvegarde a expiré.")),
              30000,
            );
          }),
        ]);
      } finally {
        window.clearTimeout(saveTimeout);
      }

      toast.success(
        mode === "create" ? "Article créé !" : "Article mis à jour !",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Titre de l'article"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className={formErrors.title ? "border-destructive" : ""}
            />
            {formErrors.title && (
              <p className="text-sm text-destructive mt-1">
                {formErrors.title}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              placeholder="mon-article-slug"
              value={formData.slug}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              className={formErrors.slug ? "border-destructive" : ""}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Utilisé dans l'URL de l'article
            </p>
            {formErrors.slug && (
              <p className="text-sm text-destructive mt-1">{formErrors.slug}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Extrait</Label>
            <textarea
              id="excerpt"
              placeholder="Bref aperçu de l'article"
              rows={3}
              value={formData.excerpt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className={cn(
                "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                formErrors.excerpt && "border-destructive",
              )}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Affiché dans les listes et les aperçus
            </p>
            {formErrors.excerpt && (
              <p className="text-sm text-destructive mt-1">
                {formErrors.excerpt}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-col items-start justify-between gap-3">
              <Label>Contenu</Label>
              {editor && <MenuBar editor={editor} />}
            </div>

            <div
              className={cn(
                "rounded-md border border-input bg-background px-3 py-3",
                formErrors.content && "border-destructive",
              )}
            >
              <EditorContent editor={editor} />
            </div>
            <p className="text-sm text-muted-foreground">
              L'éditeur enregistre du HTML riche pour préserver le rendu public
              tel qu'il est rédigé.
            </p>
            {formErrors.content && (
              <p className="text-sm text-destructive">{formErrors.content}</p>
            )}

            <Card className="overflow-hidden">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Aperçu</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="blog-rich-content prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html:
                      formData.content ||
                      '<p class="text-muted-foreground">L’aperçu apparaîtra ici.</p>',
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Meta Description */}
          <div>
            <Label htmlFor="metaDescription">Description Meta (SEO)</Label>
            <textarea
              id="metaDescription"
              placeholder="Description pour les moteurs de recherche (150-160 caractères)"
              rows={3}
              value={formData.metaDescription ?? ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  metaDescription: e.target.value || null,
                }))
              }
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <Label htmlFor="metaKeywords">Mots-clés (SEO)</Label>
            <Input
              id="metaKeywords"
              placeholder="mot-clé1, mot-clé2, mot-clé3"
              value={formData.metaKeywords ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  metaKeywords: e.target.value || null,
                }))
              }
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <Label htmlFor="categoryId">Catégorie</Label>
            <Select
              value={formData.categoryId}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, categoryId: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.categoryId && (
              <p className="text-sm text-destructive mt-1">
                {formErrors.categoryId}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  status: val as "draft" | "published",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="published">Publiée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Image en vedette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed p-6 text-center transition ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="text-sm text-muted-foreground">
                    Glissez-déposez une image ou cliquez
                  </div>
                </label>
              </div>

              {currentImagePreview && (
                <div className="relative">
                  <img
                    src={currentImagePreview}
                    alt="Preview"
                    className="w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLocalPreviewUrl(null);
                      setSelectedFile(null);
                      setFormData((prev) => ({
                        ...prev,
                        featuredImageUrl: null,
                      }));
                    }}
                    className="absolute top-2 right-2 bg-destructive text-white p-1 rounded text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2 size-4" />}
          {mode === "create" ? "Créer l'article" : "Mettre à jour l'article"}
        </Button>
      </div>
    </form>
  );
}
