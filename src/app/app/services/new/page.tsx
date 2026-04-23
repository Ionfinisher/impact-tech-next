"use client";

import { useEffect, useState } from "react";

import { createService, type CreateServiceInput } from "@/db/services";
import { watchAllServiceCategories } from "@/db/serviceCategory";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { ServiceEditorForm } from "../ServiceEditorForm";

export default function NewServicePage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [categoryOptions, setCategoryOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    setTitle("Nouveau service");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading || !user) {
      setCategoryOptions([]);
      return;
    }

    const unsubscribe = watchAllServiceCategories((nextCategories) => {
      setCategoryOptions(
        nextCategories.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      );
    });

    return () => unsubscribe();
  }, [authLoading, user]);

  const handleCreateService = async (payload: CreateServiceInput) => {
    await createService(payload);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:p-6">
        <h2 className="text-xl font-semibold">Créer un service</h2>
        <ServiceEditorForm
          mode="create"
          categoryOptions={categoryOptions}
          onSubmitAction={handleCreateService}
        />
      </div>
    </div>
  );
}
