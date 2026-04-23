"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  getServiceById,
  updateService,
  type CreateServiceInput,
  type Service,
} from "@/db/services";
import { watchAllServiceCategories } from "@/db/serviceCategory";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { ServiceEditorForm } from "../../ServiceEditorForm";

export default function EditServicePage() {
  const params = useParams<{ serviceId: string | string[] }>();
  const setTitle = usePageTitleStore((state) => state.setTitle);

  const serviceId = useMemo(() => {
    if (!params?.serviceId) {
      return "";
    }

    return Array.isArray(params.serviceId)
      ? (params.serviceId[0] ?? "")
      : params.serviceId;
  }, [params]);

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    setTitle("Modifier un service");
  }, [setTitle]);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      setError("Identifiant de service invalide.");
      return;
    }

    setLoading(true);
    setError(null);

    getServiceById(serviceId)
      .then((nextService) => {
        setService(nextService);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger le service.");
        setLoading(false);
      });
  }, [serviceId]);

  useEffect(() => {
    const unsubscribe = watchAllServiceCategories((nextCategories) => {
      setCategoryOptions(
        nextCategories.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateService = async (
    payload: CreateServiceInput,
    nextServiceId?: string,
  ) => {
    if (!nextServiceId) {
      throw new Error("Service ID manquant.");
    }

    await updateService(nextServiceId, payload);
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

  if (!service) {
    return (
      <div className="px-4 py-6 text-sm text-muted-foreground">
        Service introuvable.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <h2 className="text-xl font-semibold">Modifier le service</h2>
        <ServiceEditorForm
          mode="edit"
          initialService={service}
          categoryOptions={categoryOptions}
          onSubmitAction={handleUpdateService}
        />
      </div>
    </div>
  );
}
