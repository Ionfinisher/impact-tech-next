"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IconDotsVertical } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  serviceCategoriesSchema,
  type ServiceCategory,
} from "@/db/serviceCategory";

export { serviceCategoriesSchema };

const categoryTypeLabels: Record<string, string> = {
  architecture: "Architecture",
  batiment_construction: "Bâtiment / BTP",
  electricite: "Électricité",
  informatique: "Informatique",
};

export type CategoryColumnActions = {
  onViewAction: (category: ServiceCategory) => void;
  onEditAction: (category: ServiceCategory) => void;
  onDeleteAction: (category: ServiceCategory) => void;
};

function formatDate(dateString: string | null): string {
  if (!dateString) {
    return "N/A";
  }

  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getColumns({
  onDeleteAction,
  onEditAction,
  onViewAction,
}: CategoryColumnActions): ColumnDef<ServiceCategory>[] {
  return [
    {
      accessorKey: "name",
      header: "Nom",
    },
    {
      accessorKey: "typeId",
      header: "Type",
      cell: ({ row }) => {
        const typeId = row.getValue<string>("typeId");

        return (
          <Badge variant="outline" className="text-muted-foreground px-1.5">
            {categoryTypeLabels[typeId] ?? typeId}
          </Badge>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue<string>("description");

        return (
          <div className="max-w-xl truncate text-muted-foreground">
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Créé le",
      cell: ({ row }) => formatDate(row.getValue<string | null>("createdAt")),
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
