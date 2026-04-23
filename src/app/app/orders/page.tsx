"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./dataTable";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { watchAllOrders, type Order } from "@/db/order";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    setTitle("Commandes");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setOrders([]);
      setOrdersLoading(false);
      return;
    }

    setOrdersLoading(true);
    setOrdersError(null);

    const unsubscribe = watchAllOrders(
      (nextOrders) => {
        setOrders(nextOrders);
        setOrdersLoading(false);
      },
      () => {
        setOrdersError("Impossible de charger les commandes.");
        setOrdersLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {ordersError ? (
            <div className="px-4 text-sm text-destructive">{ordersError}</div>
          ) : authLoading || ordersLoading ? (
            <div className="px-4 text-sm text-muted-foreground">
              Chargement des commandes...
            </div>
          ) : (
            <DataTable data={orders} />
          )}
        </div>
      </div>
    </div>
  );
}
