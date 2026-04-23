import { db } from "@/lib/firebase.browser";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { z } from "zod";

const firestoreServiceCategorySchema = z.object({
  createdAt: z.unknown().optional(),
  description: z.string(),
  name: z.string(),
  typeId: z.string(),
  updatedAt: z.unknown().optional(),
});

export const serviceCategoriesSchema = z.object({
  id: z.string(),
  createdAt: z.string().nullable(),
  description: z.string(),
  name: z.string(),
  typeId: z.string(),
  updatedAt: z.string().nullable(),
});

export const serviceCategoryCreateSchema = z.object({
  description: z.string().trim().min(1, "La description est requise."),
  name: z.string().trim().min(1, "Le nom est requis."),
  typeId: z.string().trim().min(1, "Le type est requis."),
});

export const serviceCategoryUpdateSchema =
  serviceCategoryCreateSchema.partial();

export type ServiceCategory = z.infer<typeof serviceCategoriesSchema>;
export type CreateServiceCategoryInput = z.infer<
  typeof serviceCategoryCreateSchema
>;
export type UpdateServiceCategoryInput = z.infer<
  typeof serviceCategoryUpdateSchema
>;

function getServiceCategoriesCollection() {
  return collection(db, "serviceCategories");
}

function toIsoDate(value: unknown): string | null {
  if (value == null) {
    return null;
  }

  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return null;
}

function mapServiceCategoryDoc(
  id: string,
  input: unknown,
): ServiceCategory | null {
  const parsed = firestoreServiceCategorySchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const category = parsed.data;
  return serviceCategoriesSchema.parse({
    id,
    createdAt: toIsoDate(category.createdAt),
    description: category.description,
    name: category.name,
    typeId: category.typeId,
    updatedAt: toIsoDate(category.updatedAt),
  });
}

export async function createServiceCategory(
  input: CreateServiceCategoryInput,
): Promise<string> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const payload = serviceCategoryCreateSchema.parse(input);
  const now = Timestamp.now();

  const created = await addDoc(serviceCategoriesCollection, {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });

  return created.id;
}

export async function updateServiceCategory(
  serviceCategoryId: string,
  input: UpdateServiceCategoryInput,
): Promise<void> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const payload = serviceCategoryUpdateSchema.parse(input);
  const docRef = doc(serviceCategoriesCollection, serviceCategoryId);

  await updateDoc(docRef, {
    ...payload,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteServiceCategory(
  serviceCategoryId: string,
): Promise<void> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const docRef = doc(serviceCategoriesCollection, serviceCategoryId);
  await deleteDoc(docRef);
}

export async function getServiceCategoryById(
  serviceCategoryId: string,
): Promise<ServiceCategory | null> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const docRef = doc(serviceCategoriesCollection, serviceCategoryId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return mapServiceCategoryDoc(docSnap.id, docSnap.data());
}

export async function listAllServiceCategories(): Promise<ServiceCategory[]> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const categoriesQuery = query(
    serviceCategoriesCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  const snapshot = await getDocs(categoriesQuery);
  return snapshot.docs
    .map((categoryDoc) =>
      mapServiceCategoryDoc(categoryDoc.id, categoryDoc.data()),
    )
    .filter((category): category is ServiceCategory => category !== null);
}

export async function listServiceCategoriesByTypeId(
  typeId: string,
): Promise<ServiceCategory[]> {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const categoriesQuery = query(
    serviceCategoriesCollection,
    where("typeId", "==", typeId),
    orderBy("createdAt", "desc"),
    limit(200),
  );

  const snapshot = await getDocs(categoriesQuery);
  return snapshot.docs
    .map((categoryDoc) =>
      mapServiceCategoryDoc(categoryDoc.id, categoryDoc.data()),
    )
    .filter((category): category is ServiceCategory => category !== null);
}

export function watchAllServiceCategories(
  onData: (serviceCategories: ServiceCategory[]) => void,
  onError?: (error: Error) => void,
) {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const categoriesQuery = query(
    serviceCategoriesCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  return onSnapshot(
    categoriesQuery,
    (snapshot) => {
      const categories = snapshot.docs
        .map((categoryDoc) =>
          mapServiceCategoryDoc(categoryDoc.id, categoryDoc.data()),
        )
        .filter((category): category is ServiceCategory => category !== null);

      onData(categories);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchServiceCategoryById(
  serviceCategoryId: string,
  onData: (serviceCategory: ServiceCategory | null) => void,
  onError?: (error: Error) => void,
) {
  const serviceCategoriesCollection = getServiceCategoriesCollection();
  const docRef = doc(serviceCategoriesCollection, serviceCategoryId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }

      onData(mapServiceCategoryDoc(docSnap.id, docSnap.data()));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
