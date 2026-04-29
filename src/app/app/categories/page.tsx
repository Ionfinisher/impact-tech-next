"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./dataTable";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import {
  createServiceCategory,
  deleteServiceCategory,
  updateServiceCategory,
  watchAllServiceCategories,
  type CreateServiceCategoryInput,
  type ServiceCategory,
} from "@/db/serviceCategory";
import { useAuth } from "@/hooks/useAuth";
import { TableSkeleton } from "@/components/TableSkeleton";

export default function Page() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    [],
  );
  const [serviceCategoriesLoading, setServiceCategoriesLoading] =
    useState(true);
  const [serviceCategoriesError, setServiceCategoriesError] = useState<
    string | null
  >(null);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    setTitle("Catégories des services");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setServiceCategories([]);
      setServiceCategoriesLoading(false);
      return;
    }

    setServiceCategoriesLoading(true);
    setServiceCategoriesError(null);

    const unsubscribe = watchAllServiceCategories(
      (nextCategories) => {
        setServiceCategories(nextCategories);
        setServiceCategoriesLoading(false);
      },
      () => {
        setServiceCategoriesError("Impossible de charger les catégories.");
        setServiceCategoriesLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  const handleCreateCategory = async (input: CreateServiceCategoryInput) => {
    setIsMutating(true);
    try {
      await createServiceCategory(input);
    } finally {
      setIsMutating(false);
    }
  };

  const handleUpdateCategory = async (
    serviceCategoryId: string,
    input: CreateServiceCategoryInput,
  ) => {
    setIsMutating(true);
    try {
      await updateServiceCategory(serviceCategoryId, input);
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteCategory = async (serviceCategoryId: string) => {
    setIsMutating(true);
    try {
      await deleteServiceCategory(serviceCategoryId);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {serviceCategoriesError ? (
            <div className="px-4 text-sm text-destructive">
              {serviceCategoriesError}
            </div>
          ) : authLoading || serviceCategoriesLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              data={serviceCategories}
              isMutating={isMutating}
              onCreateAction={handleCreateCategory}
              onUpdateAction={handleUpdateCategory}
              onDeleteAction={handleDeleteCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}
