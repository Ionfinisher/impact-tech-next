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

const firestoreServiceSchema = z.object({
  categoryId: z.string(),
  createdAt: z.unknown().optional(),
  description: z.string(),
  imageUrl: z.string().nullable().optional(),
  name: z.string(),
  pricePerDay: z.number(),
  requiresQuotation: z.boolean().optional(),
  serviceTypeId: z.string(),
  updatedAt: z.unknown().optional(),
});

export const servicesSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  createdAt: z.string().nullable(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  name: z.string(),
  pricePerDay: z.number(),
  requiresQuotation: z.boolean(),
  serviceTypeId: z.string(),
  updatedAt: z.string().nullable(),
});

export const serviceCreateSchema = z.object({
  categoryId: z.string().trim().min(1, "La catégorie est requise."),
  description: z.string().trim().min(1, "La description est requise."),
  imageUrl: z.string().trim().nullable(),
  name: z.string().trim().min(1, "Le nom est requis."),
  pricePerDay: z.number().nonnegative(),
  requiresQuotation: z.boolean(),
  serviceTypeId: z.string().trim().min(1, "Le type de service est requis."),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export type Service = z.infer<typeof servicesSchema>;
export type CreateServiceInput = z.infer<typeof serviceCreateSchema>;
export type UpdateServiceInput = z.infer<typeof serviceUpdateSchema>;

function getServicesCollection() {
  return collection(db, "services");
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

function mapServiceDoc(id: string, input: unknown): Service | null {
  const parsed = firestoreServiceSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const service = parsed.data;
  return servicesSchema.parse({
    id,
    categoryId: service.categoryId,
    createdAt: toIsoDate(service.createdAt),
    description: service.description,
    imageUrl: service.imageUrl ?? null,
    name: service.name,
    pricePerDay: service.pricePerDay,
    requiresQuotation: service.requiresQuotation ?? false,
    serviceTypeId: service.serviceTypeId,
    updatedAt: toIsoDate(service.updatedAt),
  });
}

export async function createService(
  input: CreateServiceInput,
): Promise<string> {
  const servicesCollection = getServicesCollection();
  const payload = serviceCreateSchema.parse(input);
  const now = Timestamp.now();

  const created = await addDoc(servicesCollection, {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });

  return created.id;
}

export async function updateService(
  serviceId: string,
  input: UpdateServiceInput,
): Promise<void> {
  const servicesCollection = getServicesCollection();
  const payload = serviceUpdateSchema.parse(input);
  const docRef = doc(servicesCollection, serviceId);

  await updateDoc(docRef, {
    ...payload,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteService(serviceId: string): Promise<void> {
  const servicesCollection = getServicesCollection();
  const docRef = doc(servicesCollection, serviceId);
  await deleteDoc(docRef);
}

export async function getServiceById(
  serviceId: string,
): Promise<Service | null> {
  const servicesCollection = getServicesCollection();
  const docRef = doc(servicesCollection, serviceId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return mapServiceDoc(docSnap.id, docSnap.data());
}

export async function listAllServices(): Promise<Service[]> {
  const servicesCollection = getServicesCollection();
  const servicesQuery = query(
    servicesCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );

  const snapshot = await getDocs(servicesQuery);
  return snapshot.docs
    .map((serviceDoc) => mapServiceDoc(serviceDoc.id, serviceDoc.data()))
    .filter((service): service is Service => service !== null);
}

export async function listServicesByCategoryId(
  categoryId: string,
): Promise<Service[]> {
  const servicesCollection = getServicesCollection();
  const servicesQuery = query(
    servicesCollection,
    where("categoryId", "==", categoryId),
    orderBy("createdAt", "desc"),
    limit(300),
  );

  const snapshot = await getDocs(servicesQuery);
  return snapshot.docs
    .map((serviceDoc) => mapServiceDoc(serviceDoc.id, serviceDoc.data()))
    .filter((service): service is Service => service !== null);
}

export function watchAllServices(
  onData: (services: Service[]) => void,
  onError?: (error: Error) => void,
) {
  const servicesCollection = getServicesCollection();
  const servicesQuery = query(
    servicesCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );

  return onSnapshot(
    servicesQuery,
    (snapshot) => {
      const services = snapshot.docs
        .map((serviceDoc) => mapServiceDoc(serviceDoc.id, serviceDoc.data()))
        .filter((service): service is Service => service !== null);

      onData(services);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchServiceById(
  serviceId: string,
  onData: (service: Service | null) => void,
  onError?: (error: Error) => void,
) {
  const servicesCollection = getServicesCollection();
  const docRef = doc(servicesCollection, serviceId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }

      onData(mapServiceDoc(docSnap.id, docSnap.data()));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
