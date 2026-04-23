"use client";

import { useEffect, useState } from "react";

import { deleteService, watchAllServices, type Service } from "@/db/services";
import { watchAllServiceCategories } from "@/db/serviceCategory";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { DataTable } from "./dataTable";

export default function ServicesPage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [categoryNameById, setCategoryNameById] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    setTitle("Services");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setServices([]);
      setServicesLoading(false);
      return;
    }

    setServicesLoading(true);
    setServicesError(null);

    const unsubscribe = watchAllServices(
      (nextServices) => {
        setServices(nextServices);
        setServicesLoading(false);
      },
      () => {
        setServicesError("Impossible de charger les services.");
        setServicesLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  useEffect(() => {
    if (authLoading || !user) {
      setCategoryNameById({});
      return;
    }

    const unsubscribe = watchAllServiceCategories(
      (nextCategories) => {
        setCategoryNameById(
          nextCategories.reduce<Record<string, string>>((accumulator, item) => {
            accumulator[item.id] = item.name;
            return accumulator;
          }, {}),
        );
      },
      () => {
        setCategoryNameById({});
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  const handleDeleteService = async (serviceId: string) => {
    setIsMutating(true);
    try {
      await deleteService(serviceId);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {servicesError ? (
            <div className="px-4 text-sm text-destructive">{servicesError}</div>
          ) : authLoading || servicesLoading ? (
            <div className="px-4 text-sm text-muted-foreground">
              Chargement des services...
            </div>
          ) : (
            <DataTable
              categoryNameById={categoryNameById}
              data={services}
              isMutating={isMutating}
              onDeleteAction={handleDeleteService}
            />
          )}
        </div>
      </div>
    </div>
  );
}
