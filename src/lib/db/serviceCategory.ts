import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { z } from "zod";

import { serviceCategoriesCollection } from "@/lib/firebase.browser";

export const serviceCategorySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  description: z.string().trim().default(""),
  isActive: z.boolean().default(true),
});

export type ServiceCategoryInput = z.input<typeof serviceCategorySchema>;

export type ServiceCategory = z.output<typeof serviceCategorySchema> & {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function toDate(value: unknown): Date | undefined {
  return value instanceof Timestamp ? value.toDate() : undefined;
}

function normalizeSlug(rawSlug: string) {
  return rawSlug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeInput(input: ServiceCategoryInput) {
  const parsed = serviceCategorySchema.parse(input);

  const slug = normalizeSlug(parsed.slug);

  return serviceCategorySchema.parse({
    ...parsed,
    slug,
  });
}

export async function listServiceCategories(): Promise<ServiceCategory[]> {
  const snapshot = await getDocs(
    query(serviceCategoriesCollection, orderBy("createdAt", "desc")),
  );

  return snapshot.docs.map((item) => {
    const raw = item.data() as {
      name?: unknown;
      slug?: unknown;
      description?: unknown;
      isActive?: unknown;
      createdAt?: unknown;
      updatedAt?: unknown;
    };

    return {
      id: item.id,
      ...serviceCategorySchema.parse({
        name: raw.name,
        slug: raw.slug,
        description: raw.description ?? "",
        isActive: raw.isActive ?? true,
      }),
      createdAt: toDate(raw.createdAt),
      updatedAt: toDate(raw.updatedAt),
    };
  });
}

export async function getServiceCategoryById(
  id: string,
): Promise<ServiceCategory | null> {
  const snapshot = await getDoc(doc(serviceCategoriesCollection, id));

  if (!snapshot.exists()) {
    return null;
  }

  const raw = snapshot.data() as {
    name?: unknown;
    slug?: unknown;
    description?: unknown;
    isActive?: unknown;
    createdAt?: unknown;
    updatedAt?: unknown;
  };

  return {
    id: snapshot.id,
    ...serviceCategorySchema.parse({
      name: raw.name,
      slug: raw.slug,
      description: raw.description ?? "",
      isActive: raw.isActive ?? true,
    }),
    createdAt: toDate(raw.createdAt),
    updatedAt: toDate(raw.updatedAt),
  };
}

export async function createServiceCategory(input: ServiceCategoryInput) {
  const payload = normalizeInput(input);

  const created = await addDoc(serviceCategoriesCollection, {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return created.id;
}

export async function updateServiceCategory(
  id: string,
  input: ServiceCategoryInput,
) {
  const payload = normalizeInput(input);

  await updateDoc(doc(serviceCategoriesCollection, id), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteServiceCategory(id: string) {
  await deleteDoc(doc(serviceCategoriesCollection, id));
}
