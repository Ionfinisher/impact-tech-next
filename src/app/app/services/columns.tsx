"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IconDotsVertical } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { servicesSchema, type Service } from "@/db/services";

export { servicesSchema };

const serviceTypeLabels: Record<string, string> = {
  architecture: "Architecture",
  batiment_construction: "Bâtiment / BTP",
  electricite: "Électricité",
  informatique: "Informatique",
};

export type ServiceColumnActions = {
  categoryNameById: Record<string, string>;
  onDeleteAction: (service: Service) => void;
  onEditAction: (service: Service) => void;
  onViewAction: (service: Service) => void;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(value);
}

export function getColumns({
  categoryNameById,
  onDeleteAction,
  onEditAction,
  onViewAction,
}: ServiceColumnActions): ColumnDef<Service>[] {
  return [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "serviceTypeId",
      header: "Type",
      cell: ({ row }) => {
        const serviceTypeId = row.getValue<string>("serviceTypeId");

        return (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {serviceTypeLabels[serviceTypeId] ?? serviceTypeId}
          </Badge>
        );
      },
    },
    {
      accessorKey: "categoryId",
      header: "Catégorie",
      cell: ({ row }) => {
        const categoryId = row.original.categoryId;
        return (
          <span className="text-muted-foreground">
            {categoryNameById[categoryId] ?? categoryId}
          </span>
        );
      },
    },
    {
      accessorKey: "pricePerDay",
      header: () => <div className="text-end">Prix / jour</div>,
      cell: ({ row }) => (
        <div className="text-end font-medium">
          {formatCurrency(row.original.pricePerDay)}
        </div>
      ),
    },
    {
      accessorKey: "requiresQuotation",
      header: "Devis",
      cell: ({ row }) => (row.original.requiresQuotation ? "Oui" : "Non"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Faire une action</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => onEditAction(row.original)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewAction(row.original)}>
              Voir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDeleteAction(row.original)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
