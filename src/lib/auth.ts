import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "./firebase.browser";

const auth = getAuth(app);

/**
 * Observer pattern: Listen to auth state changes
 * Triggered whenever user logs in, logs out, or session refreshes
 */
export function observeAuthState(callback: (user: User | null) => void) {
  // Returns an unsubscribe function so you can stop listening when needed
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in:", user.email);
      callback(user);
    } else {
      console.log("No user logged in");
      callback(null);
    }
  });
}

/**
 * Get current user synchronously (may return null if auth not ready)
 * Use this sparingly - prefer observeAuthState for reactive updates
 */
export function getCurrentUser() {
  return auth.currentUser;
}

export { auth };
