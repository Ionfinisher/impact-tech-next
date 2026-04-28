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
} from "firebase/firestore";
import { z } from "zod";

const firestoreBlogCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  createdAt: z.unknown().optional(),
  updatedAt: z.unknown().optional(),
});

export const blogCategoriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

export const blogCategoryCreateSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis."),
  slug: z.string().trim().min(1, "Le slug est requis."),
  description: z.string().trim().min(1, "La description est requise."),
});

export const blogCategoryUpdateSchema = blogCategoryCreateSchema.partial();

export type BlogCategory = z.infer<typeof blogCategoriesSchema>;
export type CreateBlogCategoryInput = z.infer<typeof blogCategoryCreateSchema>;
export type UpdateBlogCategoryInput = z.infer<typeof blogCategoryUpdateSchema>;

function getBlogCategoriesCollection() {
  return collection(db, "blogCategories");
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

function mapBlogCategoryDoc(id: string, input: unknown): BlogCategory | null {
  const parsed = firestoreBlogCategorySchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const category = parsed.data;
  return blogCategoriesSchema.parse({
    id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    createdAt: toIsoDate(category.createdAt),
    updatedAt: toIsoDate(category.updatedAt),
  });
}

export async function createBlogCategory(
  input: CreateBlogCategoryInput,
): Promise<string> {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const payload = blogCategoryCreateSchema.parse(input);
  const now = Timestamp.now();

  const created = await addDoc(blogCategoriesCollection, {
    ...payload,
    createdAt: now,
    updatedAt: now,
  });

  return created.id;
}

export async function updateBlogCategory(
  blogCategoryId: string,
  input: UpdateBlogCategoryInput,
): Promise<void> {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const payload = blogCategoryUpdateSchema.parse(input);
  const docRef = doc(blogCategoriesCollection, blogCategoryId);

  await updateDoc(docRef, {
    ...payload,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteBlogCategory(
  blogCategoryId: string,
): Promise<void> {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const docRef = doc(blogCategoriesCollection, blogCategoryId);
  await deleteDoc(docRef);
}

export async function getBlogCategoryById(
  blogCategoryId: string,
): Promise<BlogCategory | null> {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const docRef = doc(blogCategoriesCollection, blogCategoryId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return mapBlogCategoryDoc(docSnap.id, docSnap.data());
}

export async function listAllBlogCategories(): Promise<BlogCategory[]> {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const categoriesQuery = query(
    blogCategoriesCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  const snapshot = await getDocs(categoriesQuery);
  return snapshot.docs
    .map((categoryDoc) =>
      mapBlogCategoryDoc(categoryDoc.id, categoryDoc.data()),
    )
    .filter((category): category is BlogCategory => category !== null);
}

export function watchAllBlogCategories(
  onData: (categories: BlogCategory[]) => void,
  onError?: (error: Error) => void,
) {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const categoriesQuery = query(
    blogCategoriesCollection,
    orderBy("createdAt", "desc"),
    limit(200),
  );

  return onSnapshot(
    categoriesQuery,
    (snapshot) => {
      const categories = snapshot.docs
        .map((categoryDoc) =>
          mapBlogCategoryDoc(categoryDoc.id, categoryDoc.data()),
        )
        .filter((category): category is BlogCategory => category !== null);

      onData(categories);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchBlogCategoryById(
  blogCategoryId: string,
  onData: (category: BlogCategory | null) => void,
  onError?: (error: Error) => void,
) {
  const blogCategoriesCollection = getBlogCategoriesCollection();
  const docRef = doc(blogCategoriesCollection, blogCategoryId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }

      onData(mapBlogCategoryDoc(docSnap.id, docSnap.data()));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
