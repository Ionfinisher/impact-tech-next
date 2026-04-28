"use client";

import { useEffect, useMemo, useState } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { watchAllOrders, type Order } from "@/db/order";
import { watchAllUsers, type UserDocument } from "@/db/users";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function isTerminatedOrder(order: Order): boolean {
  return (
    order.status === "completed" || (order.status as string) === "terminated"
  );
}

function formatCurrency(value: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}

export function SectionCards() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = watchAllOrders(
      (nextOrders) => {
        setOrders(nextOrders);
        setOrdersLoading(false);
      },
      () => {
        setOrders([]);
        setOrdersLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = watchAllUsers(
      (nextUsers) => {
        setUsers(nextUsers);
        setUsersLoading(false);
      },
      () => {
        setUsers([]);
        setUsersLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const metrics = useMemo(() => {
    const terminatedOrders = orders.filter((order) => isTerminatedOrder(order));
    const revenueTotal = terminatedOrders.reduce((sum, order) => {
      return (
        sum + (typeof order.totalPrice === "number" ? order.totalPrice : 0)
      );
    }, 0);

    const pendingOrders = orders.filter(
      (order) => order.status === "pending",
    ).length;

    const now = new Date();
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const newUsersLast3Months = users.filter((user) => {
      if (!user.createdAt) {
        return false;
      }

      const createdAt = new Date(user.createdAt);
      return !Number.isNaN(createdAt.getTime()) && createdAt >= threeMonthsAgo;
    }).length;

    const growthRate =
      orders.length === 0 ? 0 : (terminatedOrders.length / orders.length) * 100;

    return {
      growthRate,
      newUsersLast3Months,
      pendingOrders,
      revenueTotal,
      terminatedOrdersCount: terminatedOrders.length,
      totalOrdersCount: orders.length,
    };
  }, [orders, users]);

  const isLoading = ordersLoading || usersLoading;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Revenue total</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : formatCurrency(metrics.revenueTotal)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {isLoading ? "..." : `${metrics.terminatedOrdersCount} terminées`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Somme des commandes terminées <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Basé sur le statut terminé
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Nouveaux utilisateurs</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : metrics.newUsersLast3Months}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />3 derniers mois
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comptes créés récemment <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Fenêtre glissante sur 90 jours
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Commandes en attentes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : metrics.pendingOrders}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              statut pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Commandes à traiter <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Nombre actuel en attente</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Taux de croissance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "..." : `${metrics.growthRate.toFixed(1)}%`}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {isLoading
                ? "..."
                : `${metrics.terminatedOrdersCount}/${metrics.totalOrdersCount}`}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Ratio des commandes terminées <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Sur l'ensemble des commandes
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
