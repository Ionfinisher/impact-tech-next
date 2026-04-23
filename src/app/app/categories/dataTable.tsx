"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus,
} from "@tabler/icons-react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";

import {
  type CreateServiceCategoryInput,
  type ServiceCategory,
} from "@/db/serviceCategory";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getColumns } from "./column";

type DrawerMode = "create" | "edit" | "view" | "delete";

type CategoryFormState = {
  description: string;
  name: string;
  typeId: string;
};

type DataTableProps = {
  data: ServiceCategory[];
  isMutating?: boolean;
  onCreateAction: (input: CreateServiceCategoryInput) => Promise<void>;
  onDeleteAction: (serviceCategoryId: string) => Promise<void>;
  onUpdateAction: (
    serviceCategoryId: string,
    input: CreateServiceCategoryInput,
  ) => Promise<void>;
};

const EMPTY_FORM: CategoryFormState = {
  description: "",
  name: "",
  typeId: "",
};

const CATEGORY_TYPE_OPTIONS = [
  { label: "Architecture", value: "architecture" },
  { label: "Bâtiment / BTP", value: "batiment_construction" },
  { label: "Électricité", value: "electricite" },
  { label: "Informatique", value: "informatique" },
];

const DRAWER_FORM_ID = "service-category-form";

function toFormState(category: ServiceCategory): CategoryFormState {
  return {
    description: category.description,
    name: category.name,
    typeId: category.typeId,
  };
}

export function DataTable({
  data,
  isMutating = false,
  onCreateAction,
  onDeleteAction,
  onUpdateAction,
}: DataTableProps) {
  const [form, setForm] = React.useState<CategoryFormState>(EMPTY_FORM);
  const [selectedCategory, setSelectedCategory] =
    React.useState<ServiceCategory | null>(null);
  const [drawerMode, setDrawerMode] = React.useState<DrawerMode | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const closeDrawer = React.useCallback(() => {
    setDrawerMode(null);
    setSelectedCategory(null);
    setForm(EMPTY_FORM);
    setSubmitError(null);
  }, []);

  const openCreate = React.useCallback(() => {
    setSubmitError(null);
    setSelectedCategory(null);
    setForm(EMPTY_FORM);
    setDrawerMode("create");
  }, []);

  const openView = React.useCallback((category: ServiceCategory) => {
    setSubmitError(null);
    setSelectedCategory(category);
    setForm(toFormState(category));
    setDrawerMode("view");
  }, []);

  const openEdit = React.useCallback((category: ServiceCategory) => {
    setSubmitError(null);
    setSelectedCategory(category);
    setForm(toFormState(category));
    setDrawerMode("edit");
  }, []);

  const openDelete = React.useCallback((category: ServiceCategory) => {
    setSubmitError(null);
    setSelectedCategory(category);
    setForm(toFormState(category));
    setDrawerMode("delete");
  }, []);

  const columns = React.useMemo(
    () =>
      getColumns({
        onDeleteAction: openDelete,
        onEditAction: openEdit,
        onViewAction: openView,
      }),
    [openDelete, openEdit, openView],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      pagination,
      sorting,
    },
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isReadOnly = drawerMode === "view";
  const canSubmit = !isReadOnly && !isSubmitting && !isMutating;

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!drawerMode || isReadOnly) {
      return;
    }

    const payload: CreateServiceCategoryInput = {
      description: form.description.trim(),
      name: form.name.trim(),
      typeId: form.typeId.trim(),
    };

    if (!payload.name || !payload.description || !payload.typeId) {
      setSubmitError("Tous les champs sont requis.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (drawerMode === "create") {
        await onCreateAction(payload);
        toast.success("Catégorie créée.");
      }

      if (drawerMode === "edit" && selectedCategory) {
        await onUpdateAction(selectedCategory.id, payload);
        toast.success("Catégorie mise à jour.");
      }

      closeDrawer();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'enregistrement.";
      setSubmitError(message);
      toast.error("Impossible d'enregistrer la catégorie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onDeleteAction(selectedCategory.id);
      toast.success("Catégorie supprimée.");
      closeDrawer();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la suppression.";
      setSubmitError(message);
      toast.error("Impossible de supprimer la catégorie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList>
          <TabsTrigger value="outline">Catégories</TabsTrigger>
        </TabsList>
        <Button onClick={openCreate} size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Ajouter une catégorie</span>
        </Button>
      </div>

      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="flex items-center justify-between gap-2">
          <Input
            className="max-w-xs"
            placeholder="Filtrer par nom..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>

        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aucune catégorie.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} sur{" "}
              {table.getPageCount() || 1}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Première page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Page précédente</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Page suivante</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Dernière page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <Drawer
        open={drawerMode !== null}
        onOpenChange={(open) => !open && closeDrawer()}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {drawerMode === "create" && "Nouvelle catégorie"}
              {drawerMode === "edit" && "Modifier la catégorie"}
              {drawerMode === "view" && "Détails de la catégorie"}
              {drawerMode === "delete" && "Supprimer la catégorie"}
            </DrawerTitle>
            <DrawerDescription>
              {drawerMode === "create" &&
                "Créez une nouvelle catégorie de service."}
              {drawerMode === "edit" &&
                "Modifiez les informations de cette catégorie."}
              {drawerMode === "view" &&
                "Consultez les informations enregistrées."}
              {drawerMode === "delete" &&
                "Cette action est irréversible. Confirmez la suppression."}
            </DrawerDescription>
          </DrawerHeader>

          {drawerMode === "delete" ? (
            <div className="px-4 text-sm text-muted-foreground">
              Voulez-vous vraiment supprimer la catégorie{" "}
              <span className="font-medium text-foreground">
                {selectedCategory?.name ?? ""}
              </span>
              ?
            </div>
          ) : (
            <form
              id={DRAWER_FORM_ID}
              className="grid gap-4 px-4"
              onSubmit={handleFormSubmit}
            >
              <div className="grid gap-2">
                <Label htmlFor="category-name">Nom</Label>
                <Input
                  id="category-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category-type">Type</Label>
                <Select
                  value={form.typeId}
                  onValueChange={(value) =>
                    setForm((previous) => ({ ...previous, typeId: value }))
                  }
                  disabled={isReadOnly}
                >
                  <SelectTrigger id="category-type">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category-description">Description</Label>
                <Input
                  id="category-description"
                  value={form.description}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      description: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                  required
                />
              </div>

              {submitError ? (
                <p className="text-sm text-destructive">{submitError}</p>
              ) : null}
            </form>
          )}

          <DrawerFooter>
            {drawerMode === "create" || drawerMode === "edit" ? (
              <Button type="submit" form={DRAWER_FORM_ID} disabled={!canSubmit}>
                {isSubmitting || isMutating
                  ? "Enregistrement..."
                  : "Enregistrer"}
              </Button>
            ) : null}

            {drawerMode === "delete" ? (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting || isMutating}
              >
                {isSubmitting || isMutating ? "Suppression..." : "Confirmer"}
              </Button>
            ) : null}

            <DrawerClose asChild>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Tabs>
  );
}
