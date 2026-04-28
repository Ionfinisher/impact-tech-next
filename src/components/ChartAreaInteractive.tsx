"use client";

import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { watchAllOrders, type Order } from "@/db/order";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const chartConfig = {
  orders: {
    label: "Commandes",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    .toISOString()
    .slice(0, 10);
}

function buildOrderEvolutionData(orders: Order[]) {
  const countByDay = new Map<string, number>();

  orders.forEach((order) => {
    if (!order.createdAt) {
      return;
    }

    const key = normalizeDate(order.createdAt);
    if (!key) {
      return;
    }

    countByDay.set(key, (countByDay.get(key) ?? 0) + 1);
  });

  return Array.from(countByDay.entries())
    .map(([date, ordersCount]) => ({ date, orders: ordersCount }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function ChartAreaInteractive() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("90d");

  useEffect(() => {
    const unsubscribe = watchAllOrders(
      (nextOrders) => {
        setOrders(nextOrders);
        setLoading(false);
      },
      () => {
        setOrders([]);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const evolutionData = useMemo(
    () => buildOrderEvolutionData(orders),
    [orders],
  );

  const filteredData = useMemo(() => {
    const referenceDate = new Date();
    const startDate = new Date(referenceDate);

    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    startDate.setDate(startDate.getDate() - daysToSubtract);

    return evolutionData.filter((item) => {
      const date = new Date(item.date);
      return !Number.isNaN(date.getTime()) && date >= startDate;
    });
  }, [evolutionData, timeRange]);

  const totalInRange = filteredData.reduce((sum, item) => sum + item.orders, 0);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Evolution des commandes</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Nombre de commandes creees dans le temps
          </span>
          <span className="@[540px]/card:hidden">Commandes dans le temps</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 mois</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 jours</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 jours</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="3 mois" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 mois
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                30 jours
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 jours
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="mb-3 px-2 text-sm text-muted-foreground sm:px-0">
          {loading
            ? "Chargement des commandes..."
            : `${totalInRange} commandes sur la periode selectionnee`}
        </div>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orders)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-orders)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
