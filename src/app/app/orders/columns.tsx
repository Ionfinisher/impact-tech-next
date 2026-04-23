"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconTrendingUp,
  IconX,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ordersSchema, type Order } from "@/db/order";

export { ordersSchema };

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Numéro de commande",
  },
  {
    accessorKey: "serviceName",
    header: "Service",
  },
  {
    accessorKey: "userFullName",
    header: "Client",
    cell: ({ row }) => {
      const fullName = row.getValue<string | null>("userFullName");
      return fullName ? (
        <div>{fullName}</div>
      ) : (
        <div className="text-muted-foreground">N/A</div>
      );
    },
  },
  {
    accessorKey: "requiresQuotation",
    header: "Devis requis",
    cell: ({ row }) => (row.original.requiresQuotation ? "Oui" : "Non"),
  },
  {
    accessorKey: "startDate",
    header: "Date de début",
    cell: ({ row }) => {
      const dateStr = row.getValue<string | null>("startDate");
      if (!dateStr) {
        return <div className="text-muted-foreground">N/A</div>;
      }
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    },
  },
  {
    accessorKey: "endDate",
    header: "Date de fin",
    cell: ({ row }) => {
      const dateStr = row.getValue<string | null>("endDate");
      if (!dateStr) return <div className="text-muted-foreground">N/A</div>;
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "completed" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : row.original.status === "inProgress" ? (
          <IconTrendingUp className="animate-pulse fill-yellow-500 dark:fill-yellow-400" />
        ) : row.original.status === "pending" ? (
          <IconLoader className="fill-blue-500 dark:fill-blue-400" />
        ) : row.original.status === "cancelled" ? (
          <IconX className="fill-red-500 dark:fill-red-400" />
        ) : (
          <IconDotsVertical className="fill-gray-500 dark:fill-gray-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-end">Prix Total</div>,
    cell: ({ row }) => {
      const amount = row.getValue<number | null>("totalPrice");
      if (amount == null)
        return <div className="text-right text-muted-foreground">N/A</div>;
      const formatted = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XOF",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "workLocation",
    header: () => <div className="text-end">Lieu de travail</div>,
    cell: ({ row }) => {
      const location: string | null = row.getValue("workLocation");
      if (!location) {
        return <div className="text-muted-foreground text-end">N/A</div>;
      }
      return <div className="text-end">{location}</div>;
    },
  },
  {
    id: "actions",
    cell: () => (
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
          <DropdownMenuItem>Modifier</DropdownMenuItem>
          <DropdownMenuItem>Voir</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
