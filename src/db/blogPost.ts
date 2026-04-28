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

export const blogPostStatusSchema = z.enum(["draft", "published"]);

const firestoreBlogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  featuredImageUrl: z.string().nullable().optional(),
  categoryId: z.string(),
  status: blogPostStatusSchema,
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  createdAt: z.unknown().optional(),
  updatedAt: z.unknown().optional(),
  publishedAt: z.unknown().optional(),
  authorId: z.string().optional(),
});

export const blogPostsSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  featuredImageUrl: z.string().nullable(),
  categoryId: z.string(),
  status: blogPostStatusSchema,
  metaDescription: z.string().nullable(),
  metaKeywords: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  publishedAt: z.string().nullable(),
  authorId: z.string().nullable(),
});

export const blogPostCreateSchema = z.object({
  title: z.string().trim().min(1, "Le titre est requis."),
  slug: z.string().trim().min(1, "Le slug est requis."),
  excerpt: z.string().trim().min(1, "L'extrait est requis."),
  content: z.string().trim().min(1, "Le contenu est requis."),
  featuredImageUrl: z.string().trim().nullable(),
  categoryId: z.string().trim().min(1, "La catégorie est requise."),
  status: blogPostStatusSchema,
  metaDescription: z.string().trim().nullable(),
  metaKeywords: z.string().trim().nullable(),
});

export const blogPostUpdateSchema = blogPostCreateSchema.partial();

export type BlogPost = z.infer<typeof blogPostsSchema>;
export type CreateBlogPostInput = z.infer<typeof blogPostCreateSchema>;
export type UpdateBlogPostInput = z.infer<typeof blogPostUpdateSchema>;

function getBlogPostsCollection() {
  return collection(db, "blogPosts");
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

function mapBlogPostDoc(id: string, input: unknown): BlogPost | null {
  const parsed = firestoreBlogPostSchema.safeParse(input);
  if (!parsed.success) {
    return null;
  }

  const post = parsed.data;
  return blogPostsSchema.parse({
    id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImageUrl: post.featuredImageUrl ?? null,
    categoryId: post.categoryId,
    status: post.status,
    metaDescription: post.metaDescription ?? null,
    metaKeywords: post.metaKeywords ?? null,
    createdAt: toIsoDate(post.createdAt),
    updatedAt: toIsoDate(post.updatedAt),
    publishedAt: toIsoDate(post.publishedAt),
    authorId: post.authorId ?? null,
  });
}

export async function createBlogPost(
  input: CreateBlogPostInput,
): Promise<string> {
  const blogPostsCollection = getBlogPostsCollection();
  const payload = blogPostCreateSchema.parse(input);
  const now = Timestamp.now();

  const created = await addDoc(blogPostsCollection, {
    ...payload,
    createdAt: now,
    updatedAt: now,
    publishedAt: payload.status === "published" ? now : null,
  });

  return created.id;
}

export async function updateBlogPost(
  blogPostId: string,
  input: UpdateBlogPostInput,
): Promise<void> {
  const blogPostsCollection = getBlogPostsCollection();
  const payload = blogPostUpdateSchema.parse(input);
  const docRef = doc(blogPostsCollection, blogPostId);

  const updateData: Record<string, unknown> = {
    ...payload,
    updatedAt: Timestamp.now(),
  };

  // If status changed to published, set publishedAt
  if (payload.status === "published") {
    updateData.publishedAt = Timestamp.now();
  }

  await updateDoc(docRef, updateData);
}

export async function deleteBlogPost(blogPostId: string): Promise<void> {
  const blogPostsCollection = getBlogPostsCollection();
  const docRef = doc(blogPostsCollection, blogPostId);
  await deleteDoc(docRef);
}

export async function getBlogPostById(
  blogPostId: string,
): Promise<BlogPost | null> {
  const blogPostsCollection = getBlogPostsCollection();
  const docRef = doc(blogPostsCollection, blogPostId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return mapBlogPostDoc(docSnap.id, docSnap.data());
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const blogPostsCollection = getBlogPostsCollection();
  const blogPostQuery = query(
    blogPostsCollection,
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );

  const snapshot = await getDocs(blogPostQuery);
  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return mapBlogPostDoc(doc.id, doc.data());
}

export async function listAllBlogPosts(): Promise<BlogPost[]> {
  const blogPostsCollection = getBlogPostsCollection();
  const blogPostQuery = query(
    blogPostsCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );

  const snapshot = await getDocs(blogPostQuery);
  return snapshot.docs
    .map((postDoc) => mapBlogPostDoc(postDoc.id, postDoc.data()))
    .filter((post): post is BlogPost => post !== null);
}

export async function listPublishedBlogPosts(): Promise<BlogPost[]> {
  const blogPostsCollection = getBlogPostsCollection();
  const blogPostQuery = query(
    blogPostsCollection,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(300),
  );

  const snapshot = await getDocs(blogPostQuery);
  return snapshot.docs
    .map((postDoc) => mapBlogPostDoc(postDoc.id, postDoc.data()))
    .filter((post): post is BlogPost => post !== null);
}

export async function listBlogPostsByCategoryId(
  categoryId: string,
): Promise<BlogPost[]> {
  const blogPostsCollection = getBlogPostsCollection();
  const blogPostQuery = query(
    blogPostsCollection,
    where("categoryId", "==", categoryId),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(300),
  );

  const snapshot = await getDocs(blogPostQuery);
  return snapshot.docs
    .map((postDoc) => mapBlogPostDoc(postDoc.id, postDoc.data()))
    .filter((post): post is BlogPost => post !== null);
}

export function watchAllBlogPosts(
  onData: (posts: BlogPost[]) => void,
  onError?: (error: Error) => void,
) {
  const blogPostsCollection = getBlogPostsCollection();
  const blogPostQuery = query(
    blogPostsCollection,
    orderBy("createdAt", "desc"),
    limit(300),
  );

  return onSnapshot(
    blogPostQuery,
    (snapshot) => {
      const posts = snapshot.docs
        .map((postDoc) => mapBlogPostDoc(postDoc.id, postDoc.data()))
        .filter((post): post is BlogPost => post !== null);

      onData(posts);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}

export function watchBlogPostById(
  blogPostId: string,
  onData: (post: BlogPost | null) => void,
  onError?: (error: Error) => void,
) {
  const blogPostsCollection = getBlogPostsCollection();
  const docRef = doc(blogPostsCollection, blogPostId);

  return onSnapshot(
    docRef,
    (docSnap) => {
      if (!docSnap.exists()) {
        onData(null);
        return;
      }

      onData(mapBlogPostDoc(docSnap.id, docSnap.data()));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
}
