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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ordersSchema, type Order } from "@/db/order";

export { ordersSchema };

export const ORDER_STATUS_OPTIONS: Array<{
  value: Order["status"];
  label: string;
}> = [
  { value: "pending", label: "En attente" },
  { value: "confirmed", label: "Confirmée" },
  { value: "inProgress", label: "En cours" },
  { value: "completed", label: "Terminée" },
  { value: "cancelled", label: "Annulée" },
];

export function getStatusLabel(status: Order["status"]): string {
  return (
    ORDER_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    status
  );
}

export type OrderColumnActions = {
  onViewAction: (order: Order) => void;
};

export function getColumns({
  onViewAction,
}: OrderColumnActions): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "orderNumber",
      header: "Numéro",
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
          {getStatusLabel(row.original.status)}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Créée le",
      cell: ({ row }) => {
        const dateStr = row.getValue<string | null>("createdAt");
        if (!dateStr) {
          return <div className="text-muted-foreground">N/A</div>;
        }

        return new Date(dateStr).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        });
      },
    },
    {
      accessorKey: "totalPrice",
      header: () => <div className="text-end">Prix total</div>,
      cell: ({ row }) => {
        const amount = row.getValue<number | null>("totalPrice");
        if (amount == null) {
          return <div className="text-right text-muted-foreground">N/A</div>;
        }

        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "XOF",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
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
            <DropdownMenuItem onClick={() => onViewAction(row.original)}>
              Voir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
