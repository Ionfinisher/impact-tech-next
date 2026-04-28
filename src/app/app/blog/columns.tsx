import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { type BlogPost } from "@/db/blogPost";

export const getColumns = (): ColumnDef<BlogPost>[] => {
  return [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => row.getValue("title"),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <code className="text-xs text-muted-foreground">
          {row.getValue("slug")}
        </code>
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = status === "published" ? "default" : "secondary";
        return (
          <Badge variant={variant}>
            {status === "published" ? "Publiée" : "Brouillon"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Créée",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string | null;
        if (!date) return null;
        return new Date(date).toLocaleDateString("fr-FR");
      },
    },
  ];
};
