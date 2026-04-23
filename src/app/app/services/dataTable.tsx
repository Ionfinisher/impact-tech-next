"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

import { type Service } from "@/db/services";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getColumns } from "./columns";

type DrawerMode = "view" | "delete";

type DataTableProps = {
  categoryNameById: Record<string, string>;
  data: Service[];
  isMutating?: boolean;
  onDeleteAction: (serviceId: string) => Promise<void>;
};

function formatDate(dateString: string | null): string {
  if (!dateString) {
    return "N/A";
  }

  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(value);
}

export function DataTable({
  categoryNameById,
  data,
  isMutating = false,
  onDeleteAction,
}: DataTableProps) {
  const router = useRouter();
  const [selectedService, setSelectedService] = React.useState<Service | null>(
    null,
  );
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
    setSelectedService(null);
    setSubmitError(null);
  }, []);

  const openView = React.useCallback((service: Service) => {
    setSubmitError(null);
    setSelectedService(service);
    setDrawerMode("view");
  }, []);

  const openDelete = React.useCallback((service: Service) => {
    setSubmitError(null);
    setSelectedService(service);
    setDrawerMode("delete");
  }, []);

  const columns = React.useMemo(
    () =>
      getColumns({
        categoryNameById,
        onDeleteAction: openDelete,
        onEditAction: (service) => {
          router.push(`/app/services/${service.id}/edit`);
        },
        onViewAction: openView,
      }),
    [categoryNameById, openDelete, openView, router],
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

  const handleDelete = async () => {
    if (!selectedService) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onDeleteAction(selectedService.id);
      toast.success("Service supprimé.");
      closeDrawer();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la suppression.";
      setSubmitError(message);
      toast.error("Impossible de supprimer le service.");
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
          <TabsTrigger value="outline">Services</TabsTrigger>
        </TabsList>
        <Button asChild size="sm">
          <Link href="/app/services/new">
            <IconPlus />
            <span className="hidden lg:inline">Ajouter un service</span>
          </Link>
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
                    Aucun service.
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
              {drawerMode === "view" && "Détails du service"}
              {drawerMode === "delete" && "Supprimer le service"}
            </DrawerTitle>
            <DrawerDescription>
              {drawerMode === "view" &&
                "Consultez les informations enregistrées."}
              {drawerMode === "delete" &&
                "Cette action est irréversible. Confirmez la suppression."}
            </DrawerDescription>
          </DrawerHeader>

          {drawerMode === "delete" ? (
            <div className="px-4 text-sm text-muted-foreground">
              Voulez-vous vraiment supprimer le service{" "}
              <span className="font-medium text-foreground">
                {selectedService?.name ?? ""}
              </span>
              ?
            </div>
          ) : drawerMode === "view" && selectedService ? (
            <div className="grid gap-3 px-4 text-sm">
              <p>
                <span className="font-medium">Nom:</span> {selectedService.name}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {selectedService.description}
              </p>
              <p>
                <span className="font-medium">Type:</span>{" "}
                {selectedService.serviceTypeId}
              </p>
              <p>
                <span className="font-medium">Catégorie:</span>{" "}
                {categoryNameById[selectedService.categoryId] ??
                  selectedService.categoryId}
              </p>
              <p>
                <span className="font-medium">Prix / jour:</span>{" "}
                {formatCurrency(selectedService.pricePerDay)}
              </p>
              <p>
                <span className="font-medium">Devis requis:</span>{" "}
                {selectedService.requiresQuotation ? "Oui" : "Non"}
              </p>
              <div>
                <p>
                  <span className="font-medium">Image URL:</span>{" "}
                  {selectedService.imageUrl ? (
                    <a
                      href={selectedService.imageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Ouvrir l'image
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                {selectedService.imageUrl ? (
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.name}
                    className="mt-2 h-44 w-full rounded-md border object-cover"
                  />
                ) : null}
              </div>
              <p>
                <span className="font-medium">Créé le:</span>{" "}
                {formatDate(selectedService.createdAt)}
              </p>
              <p>
                <span className="font-medium">Mis à jour le:</span>{" "}
                {formatDate(selectedService.updatedAt)}
              </p>
            </div>
          ) : null}

          <DrawerFooter>
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

          {submitError ? (
            <p className="px-4 pb-4 text-sm text-destructive">{submitError}</p>
          ) : null}
        </DrawerContent>
      </Drawer>
    </Tabs>
  );
}
