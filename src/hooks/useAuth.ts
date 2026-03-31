import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { observeAuthState } from "@/lib/auth";

/**
 * useAuth Hook - Observer Pattern in React
 *
 * Usage in a component:
 * const { user, loading } = useAuth();
 *
 * When user logs in/out, this hook automatically updates the state
 * and re-renders your component with the new user info
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up the observer listener when component mounts
    const unsubscribe = observeAuthState((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    // Cleanup: stop listening when component unmounts
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
