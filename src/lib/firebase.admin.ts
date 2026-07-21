import admin from "firebase-admin";

export function getFirebaseAdmin() {
  if (!admin.getApps.length) {
    admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  return admin;
}

export const firebaseAdmin = getFirebaseAdmin();
