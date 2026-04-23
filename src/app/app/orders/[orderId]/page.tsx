"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import {
  orderStatusSchema,
  type Order,
  updateOrderStatus,
  watchOrderById,
} from "@/db/order";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { ORDER_STATUS_OPTIONS, getStatusLabel } from "../columns";

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

function formatCurrency(value: number | null): string {
  if (value == null) {
    return "N/A";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
  }).format(value);
}

export default function OrderDetailsPage() {
  const params = useParams<{ orderId: string | string[] }>();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  const orderId = useMemo(() => {
    if (!params?.orderId) {
      return "";
    }

    return Array.isArray(params.orderId)
      ? (params.orderId[0] ?? "")
      : params.orderId;
  }, [params]);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<Order["status"] | "">("");
  const [isSavingStatus, setIsSavingStatus] = useState(false);

  useEffect(() => {
    setTitle(
      order?.orderNumber ? `Commande ${order.orderNumber}` : "Détail commande",
    );
  }, [order?.orderNumber, setTitle]);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError("Identifiant de commande invalide.");
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = watchOrderById(
      orderId,
      (nextOrder) => {
        setOrder(nextOrder);
        setNextStatus(nextOrder?.status ?? "");
        setLoading(false);
      },
      () => {
        setError("Impossible de charger cette commande.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [orderId]);

  const handleSaveStatus = async () => {
    if (!order || !nextStatus || nextStatus === order.status) {
      return;
    }

    const parsed = orderStatusSchema.safeParse(nextStatus);
    if (!parsed.success) {
      toast.error("Statut invalide.");
      return;
    }

    setIsSavingStatus(true);
    try {
      await updateOrderStatus(order.id, parsed.data);
      toast.success("Statut mis à jour.");
    } catch {
      toast.error("Impossible de mettre à jour le statut.");
    } finally {
      setIsSavingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-6 text-sm text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (error) {
    return <div className="px-4 py-6 text-sm text-destructive">{error}</div>;
  }

  if (!order) {
    return (
      <div className="px-4 py-6 text-sm text-muted-foreground">
        Commande introuvable.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Commande {order.orderNumber}
            </h2>
            <p className="text-sm text-muted-foreground">
              Service: {order.serviceName}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/app/orders">Retour aux commandes</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Statut</CardTitle>
            <CardDescription>
              Mettez a jour le statut de la commande.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="grid w-full max-w-xs gap-2">
              <Label htmlFor="order-status">Nouveau statut</Label>
              <Select
                value={nextStatus}
                onValueChange={(value) =>
                  setNextStatus(value as Order["status"])
                }
              >
                <SelectTrigger id="order-status">
                  <SelectValue placeholder="Choisir un statut" />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSaveStatus}
              disabled={
                isSavingStatus || !nextStatus || nextStatus === order.status
              }
            >
              {isSavingStatus ? "Mise a jour..." : "Mettre a jour"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Statut actuel: {getStatusLabel(order.status)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations commande</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <p>
              <span className="font-medium">Client:</span>{" "}
              {order.userFullName ?? "N/A"}
            </p>
            <p>
              <span className="font-medium">ID utilisateur:</span>{" "}
              {order.userId ?? "N/A"}
            </p>
            <p>
              <span className="font-medium">Date creation:</span>{" "}
              {formatDate(order.createdAt)}
            </p>
            <p>
              <span className="font-medium">Derniere mise a jour:</span>{" "}
              {formatDate(order.updatedAt)}
            </p>
            <p>
              <span className="font-medium">Date debut:</span>{" "}
              {formatDate(order.startDate)}
            </p>
            <p>
              <span className="font-medium">Date fin:</span>{" "}
              {formatDate(order.endDate)}
            </p>
            <p>
              <span className="font-medium">Prix total:</span>{" "}
              {formatCurrency(order.totalPrice)}
            </p>
            <p>
              <span className="font-medium">Lieu de travail:</span>{" "}
              {order.workLocation ?? "N/A"}
            </p>
            <p>
              <span className="font-medium">Devis requis:</span>{" "}
              {order.requiresQuotation ? "Oui" : "Non"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
