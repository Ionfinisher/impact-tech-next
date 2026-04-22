"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import {
  createServiceCategory,
  deleteServiceCategory,
  listServiceCategories,
  type ServiceCategory,
  type ServiceCategoryInput,
  updateServiceCategory,
} from "@/lib/db/serviceCategory";

type FormState = ServiceCategoryInput;

const defaultFormState: FormState = {
  name: "",
  slug: "",
  description: "",
  isActive: true,
};

export default function ServiceCategoriesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );
  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const isEditing = useMemo(
    () => Boolean(editingCategoryId),
    [editingCategoryId],
  );

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listServiceCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load service categories.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingCategoryId(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (item: ServiceCategory) => {
    setEditingCategoryId(item.id);
    setFormState({
      name: item.name,
      slug: item.slug,
      description: item.description,
      isActive: item.isActive,
    });
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Delete this service category permanently?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteServiceCategory(id);
      setCategories((current) => current.filter((item) => item.id !== id));
      toast.success("Service category deleted.");
    } catch {
      toast.error("Failed to delete service category.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingCategoryId) {
        await updateServiceCategory(editingCategoryId, formState);
        toast.success("Service category updated.");
      } else {
        await createServiceCategory(formState);
        toast.success("Service category created.");
      }

      setIsDrawerOpen(false);
      resetForm();
      await loadCategories();
    } catch {
      toast.error("Please check form values and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Service Categories</h1>
          <p className="text-muted-foreground text-sm">
            Create, update and remove service categories.
          </p>
        </div>
        <Button onClick={openCreateDrawer}>
          <IconPlus />
          Add category
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[140px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  Loading categories...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No service category found.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.slug}</TableCell>
                  <TableCell>{item.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell className="max-w-[500px] truncate">
                    {item.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDrawer(item)}
                      >
                        <IconPencil />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => void handleDelete(item.id)}
                      >
                        <IconTrash />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={onCloseDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Edit service category" : "Create service category"}
            </DrawerTitle>
          </DrawerHeader>

          <form
            id="service-category-form"
            onSubmit={(event) => void handleSubmit(event)}
            className="grid gap-4 px-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="service-category-name">Name</Label>
              <Input
                id="service-category-name"
                value={formState.name}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-category-slug">Slug</Label>
              <Input
                id="service-category-slug"
                value={formState.slug}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    slug: event.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-category-description">Description</Label>
              <textarea
                id="service-category-description"
                value={formState.description}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                className="border-input bg-background min-h-20 rounded-md border px-3 py-2 text-sm shadow-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="service-category-is-active"
                checked={formState.isActive}
                onCheckedChange={(checked) =>
                  setFormState((current) => ({
                    ...current,
                    isActive: checked === true,
                  }))
                }
              />
              <Label htmlFor="service-category-is-active">Active category</Label>
            </div>
          </form>

          <DrawerFooter>
            <Button
              type="submit"
              form="service-category-form"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update category"
                  : "Create category"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onCloseDrawer(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
