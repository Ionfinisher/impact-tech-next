"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IconDotsVertical } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usersSchema, type UserDocument } from "@/db/users";

export { usersSchema };

export type UserColumnActions = {
  onViewAction: (user: UserDocument) => void;
};

function formatDate(dateString: string | null): string {
  if (!dateString) {
    return "N/A";
  }

  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function getColumns({
  onViewAction,
}: UserColumnActions): ColumnDef<UserDocument>[] {
  return [
    {
      accessorKey: "displayName",
      header: "Nom",
      cell: ({ row }) => {
        const name = row.getValue<string | null>("displayName");
        return name ? (
          <span>{name}</span>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue<string | null>("email");
        return email ? (
          <span>{email}</span>
        ) : (
          <span className="text-muted-foreground">N/A</span>
        );
      },
    },
    {
      accessorKey: "notificationsEnabled",
      header: "Notifications",
      cell: ({ row }) => {
        return row.original.notificationsEnabled ? (
          <Badge variant="outline" className="text-green-600">
            Activées
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">
            Désactivées
          </Badge>
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
            <DropdownMenuItem onClick={() => onViewAction(row.original)}>
              Voir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
}
