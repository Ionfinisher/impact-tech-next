"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type RouteGuardProps = {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo: string;
};

export function RouteGuard({
  children,
  requireAuth = true,
  redirectTo,
}: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isAllowed = requireAuth ? Boolean(user) : !user;

  useEffect(() => {
    if (!loading && !isAllowed) {
      router.replace(redirectTo);
    }
  }, [isAllowed, loading, redirectTo, router]);

  if (loading || !isAllowed) {
    return null;
  }

  // Force a remount on route changes to avoid stale auth-dependent UI.
  return <div key={pathname}>{children}</div>;
}
