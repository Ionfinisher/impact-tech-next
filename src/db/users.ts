import { db } from "@/lib/firebase.browser";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { z } from "zod";

const firestoreUserSchema = z.object({
  createdAt: z.unknown().optional(),
  displayName: z.string().optional(),
  email: z.string().optional(),
  fcmToken: z.string().optional(),
  fcmTokenUpdatedAt: z.unknown().optional(),
  notificationsEnabled: z.boolean().optional(),
  updatedAt: z.unknown().optional(),
});

export const usersSchema = z.object({
  id: z.string(),
  createdAt: z.string().nullable(),
  displayName: z.string().nullable(),
  email: z.string().nullable(),
  fcmToken: z.string().nullable(),
  fcmTokenUpdatedAt: z.string().nullable(),
  notificationsEnabled: z.boolean(),
  updatedAt: z.string().nullable(),
});

export type UserDocument = z.infer<typeof usersSchema>;

const usersCollection = collection(db, "users");

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

function mapUserDoc(id: string, input: unknown): UserDocument | null {
  const parsed = firestoreUserSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const user = parsed.data;
  return usersSchema.parse({
    id,
    createdAt: toIsoDate(user.createdAt),
    displayName: user.displayName ?? null,
    email: user.email ?? null,
    fcmToken: user.fcmToken ?? null,
    fcmTokenUpdatedAt: toIsoDate(user.fcmTokenUpdatedAt),
    notificationsEnabled: user.notificationsEnabled ?? false,
    updatedAt: toIsoDate(user.updatedAt),
  });
}

export async function listAllUsers(): Promise<UserDocument[]> {
  const usersQuery = query(
    usersCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );
  const snapshot = await getDocs(usersQuery);

  return snapshot.docs
    .map((userDoc) => mapUserDoc(userDoc.id, userDoc.data()))
    .filter((user): user is UserDocument => user !== null);
}

export async function getUserById(
  userId: string,
): Promise<UserDocument | null> {
  const docRef = doc(usersCollection, userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return mapUserDoc(docSnap.id, docSnap.data());
}

export function watchAllUsers(
  onData: (users: UserDocument[]) => void,
  onError?: (error: Error) => void,
) {
  const usersQuery = query(
    usersCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );

  return onSnapshot(
    usersQuery,
    (snapshot) => {
      const users = snapshot.docs
        .map((userDoc) => mapUserDoc(userDoc.id, userDoc.data()))
        .filter((user): user is UserDocument => user !== null);

      onData(users);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchUserById(
  userId: string,
  onData: (user: UserDocument | null) => void,
  onError?: (error: Error) => void,
) {
  const docRef = doc(usersCollection, userId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }

      onData(mapUserDoc(docSnap.id, docSnap.data()));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
