import { db } from "@/lib/firebase.browser";
import {
  Timestamp,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { z } from "zod";

export const orderStatusSchema = z.enum([
  "pending",
  "confirmed",
  "inProgress",
  "completed",
  "cancelled",
]);

const firestoreOrderSchema = z.object({
  orderNumber: z.string(),
  serviceName: z.string(),
  serviceId: z.string(),
  status: orderStatusSchema,
  requiresQuotation: z.boolean().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  totalPrice: z.number().nullable().optional(),
  workLocation: z.string().nullable().optional(),
  createdAt: z.unknown().optional(),
  updatedAt: z.unknown().optional(),
  userId: z.string().optional(),
});

const firestoreUserSchema = z.object({
  displayName: z.string().optional(),
});

export const ordersSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  serviceName: z.string(),
  serviceId: z.string(),
  status: orderStatusSchema,
  requiresQuotation: z.boolean(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  totalPrice: z.number().nullable(),
  workLocation: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  userId: z.string().nullable(),
  userFullName: z.string().nullable(),
});

export type Order = z.infer<typeof ordersSchema>;

const ordersCollection = collection(db, "orders");
const usersCollection = collection(db, "users");
const userNameCache = new Map<string, string | null>();

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

function resolveFullName(input: unknown): string | null {
  const parsed = firestoreUserSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const user = parsed.data;
  return user.displayName ?? null;
}

async function getUserFullNameById(userId: string): Promise<string | null> {
  if (userNameCache.has(userId)) {
    return userNameCache.get(userId) ?? null;
  }

  const userDocRef = doc(usersCollection, userId);
  const userDocSnap = await getDoc(userDocRef);
  if (!userDocSnap.exists()) {
    userNameCache.set(userId, null);
    return null;
  }

  const fullName = resolveFullName(userDocSnap.data());
  userNameCache.set(userId, fullName);
  return fullName;
}

async function attachUserFullNames(orders: Order[]): Promise<Order[]> {
  const uniqueUserIds = [
    ...new Set(
      orders
        .map((order) => order.userId)
        .filter((userId): userId is string => Boolean(userId)),
    ),
  ];

  await Promise.all(uniqueUserIds.map((userId) => getUserFullNameById(userId)));

  return orders.map((order) => ({
    ...order,
    userFullName: order.userId
      ? (userNameCache.get(order.userId) ?? null)
      : null,
  }));
}

function mapOrderDoc(id: string, input: unknown): Order | null {
  const parsed = firestoreOrderSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const order = parsed.data;
  return ordersSchema.parse({
    id,
    orderNumber: order.orderNumber,
    serviceName: order.serviceName,
    serviceId: order.serviceId,
    status: order.status,
    requiresQuotation: order.requiresQuotation ?? false,
    startDate: order.startDate ?? null,
    endDate: order.endDate ?? null,
    totalPrice: order.totalPrice ?? null,
    workLocation: order.workLocation ?? null,
    createdAt: toIsoDate(order.createdAt),
    updatedAt: toIsoDate(order.updatedAt),
    userId: order.userId ?? null,
    userFullName: null,
  });
}

export async function listOrdersByUser(userId: string): Promise<Order[]> {
  const orderQuery = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(100),
  );

  const snapshot = await getDocs(orderQuery);
  const orders = snapshot.docs
    .map((doc) => mapOrderDoc(doc.id, doc.data()))
    .filter((doc): doc is Order => doc !== null);

  return attachUserFullNames(orders);
}

export async function listAllOrders(): Promise<Order[]> {
  const orderQuery = query(
    ordersCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  const snapshot = await getDocs(orderQuery);
  const orders = snapshot.docs
    .map((doc) => mapOrderDoc(doc.id, doc.data()))
    .filter((doc): doc is Order => doc !== null);

  return attachUserFullNames(orders);
}

export function watchOrdersByUser(
  userId: string,
  onData: (orders: Order[]) => void,
  onError?: (error: Error) => void,
) {
  const orderQuery = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(100),
  );

  return onSnapshot(
    orderQuery,
    (snapshot) => {
      const orders = snapshot.docs
        .map((doc) => mapOrderDoc(doc.id, doc.data()))
        .filter((doc): doc is Order => doc !== null);

      attachUserFullNames(orders)
        .then((nextOrders) => onData(nextOrders))
        .catch((error) => {
          if (onError) {
            onError(error as Error);
          }
        });
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchAllOrders(
  onData: (orders: Order[]) => void,
  onError?: (error: Error) => void,
) {
  const orderQuery = query(
    ordersCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  return onSnapshot(
    orderQuery,
    (snapshot) => {
      const orders = snapshot.docs
        .map((doc) => mapOrderDoc(doc.id, doc.data()))
        .filter((doc): doc is Order => doc !== null);

      attachUserFullNames(orders)
        .then((nextOrders) => onData(nextOrders))
        .catch((error) => {
          if (onError) {
            onError(error as Error);
          }
        });
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  const order = mapOrderDoc(docSnap.id, docSnap.data());
  if (!order) {
    return null;
  }

  return (await attachUserFullNames([order]))[0] ?? null;
}

export function watchOrderById(
  orderId: string,
  onData: (order: Order | null) => void,
  onError?: (error: Error) => void,
) {
  const docRef = doc(db, "orders", orderId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }
      const order = mapOrderDoc(docSnap.id, docSnap.data());
      if (!order) {
        onData(null);
        return;
      }

      attachUserFullNames([order])
        .then((nextOrders) => onData(nextOrders[0] ?? null))
        .catch((error) => {
          if (onError) {
            onError(error as Error);
          }
        });
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: z.infer<typeof orderStatusSchema>,
): Promise<void> {
  const docRef = doc(db, "orders", orderId);
  await updateDoc(docRef, {
    status: newStatus,
    updatedAt: Timestamp.now(),
  });
}
