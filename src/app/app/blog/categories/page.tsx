"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import {
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
  watchAllBlogCategories,
  type CreateBlogCategoryInput,
  type BlogCategory,
} from "@/db/blogCategory";
import { useAuth } from "@/hooks/useAuth";
import { TableSkeleton } from "@/components/TableSkeleton";

export default function BlogCategoriesPage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [formData, setFormData] = useState<CreateBlogCategoryInput>({
    name: "",
    slug: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof CreateBlogCategoryInput, string>>
  >({});

  useEffect(() => {
    setTitle("Catégories de blog");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setBlogCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = watchAllBlogCategories((nextCategories) => {
      setBlogCategories(nextCategories);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authLoading, user]);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return blogCategories;
    }

    return blogCategories.filter((category) => {
      return (
        category.name.toLowerCase().includes(normalizedQuery) ||
        category.slug.toLowerCase().includes(normalizedQuery) ||
        category.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [blogCategories, searchQuery]);

  const resetForm = () => {
    setMode(null);
    setSelectedCategoryId(null);
    setFormData({ name: "", slug: "", description: "" });
    setFormErrors({});
  };

  const openCreateForm = () => {
    setMode("create");
    setSelectedCategoryId(null);
    setFormData({ name: "", slug: "", description: "" });
    setFormErrors({});
  };

  const openEditForm = (category: BlogCategory) => {
    setMode("edit");
    setSelectedCategoryId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof CreateBlogCategoryInput, string>> =
      {};

    if (!formData.name.trim()) nextErrors.name = "Le nom est requis.";
    if (!formData.slug.trim()) nextErrors.slug = "Le slug est requis.";
    if (!formData.description.trim()) {
      nextErrors.description = "La description est requise.";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsMutating(true);
    try {
      if (mode === "create") {
        await createBlogCategory(formData);
        toast.success("Catégorie créée avec succès");
      } else if (mode === "edit" && selectedCategoryId) {
        await updateBlogCategory(selectedCategoryId, formData);
        toast.success("Catégorie mise à jour avec succès");
      }
      resetForm();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    } finally {
      setIsMutating(false);
    }
  };

  const handleDelete = async (category: BlogCategory) => {
    const shouldDelete = window.confirm(
      `Supprimer la catégorie \"${category.name}\" ? Cette action est irréversible.`,
    );

    if (!shouldDelete) {
      return;
    }

    setIsMutating(true);
    try {
      await deleteBlogCategory(category.id);
      toast.success("Catégorie supprimée avec succès");
      if (selectedCategoryId === category.id) {
        resetForm();
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Une erreur est survenue",
      );
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Catégories de blog
            </h1>
            <p className="text-sm text-muted-foreground">
              Gérez les catégories utilisées par les articles publics et
              l'admin.
            </p>
          </div>
          <Button onClick={openCreateForm} disabled={isMutating || !!mode}>
            Nouvelle catégorie
          </Button>
        </div>

        {error ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : authLoading || loading ? (
          <TableSkeleton />
        ) : (
          <>
            {mode && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {mode === "create"
                      ? "Créer une catégorie"
                      : "Modifier la catégorie"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={formErrors.name ? "border-destructive" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-xs text-destructive">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            slug: e.target.value,
                          }))
                        }
                        className={formErrors.slug ? "border-destructive" : ""}
                      />
                      {formErrors.slug && (
                        <p className="text-xs text-destructive">
                          {formErrors.slug}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className={`flex min-h-24 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition focus-visible:ring-1 focus-visible:ring-ring ${
                        formErrors.description
                          ? "border-destructive"
                          : "border-input"
                      }`}
                    />
                    {formErrors.description && (
                      <p className="text-xs text-destructive">
                        {formErrors.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSubmit} disabled={isMutating}>
                      {isMutating
                        ? "Enregistrement..."
                        : mode === "create"
                          ? "Créer"
                          : "Mettre à jour"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      disabled={isMutating}
                    >
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex items-center gap-3">
              <Input
                placeholder="Rechercher une catégorie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <div className="text-sm text-muted-foreground">
                {filteredCategories.length} catégorie(s)
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Créée le</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length ? (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>{category.slug}</TableCell>
                        <TableCell className="max-w-[420px] truncate text-muted-foreground">
                          {category.description}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {category.createdAt
                            ? new Date(category.createdAt).toLocaleDateString(
                                "fr-FR",
                              )
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditForm(category)}
                              disabled={isMutating}
                            >
                              Éditer
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(category)}
                              disabled={isMutating}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-muted-foreground"
                      >
                        Aucune catégorie trouvée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
