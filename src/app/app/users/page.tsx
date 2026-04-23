"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { watchAllUsers, type UserDocument } from "@/db/users";
import { usePageTitleStore } from "@/store/usePageTitleStore";
import { DataTable } from "./dataTable";

export default function UsersPage() {
  const setTitle = usePageTitleStore((state) => state.setTitle);
  const { user, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  useEffect(() => {
    setTitle("Utilisateurs");
  }, [setTitle]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setUsers([]);
      setUsersLoading(false);
      return;
    }

    setUsersLoading(true);
    setUsersError(null);

    const unsubscribe = watchAllUsers(
      (nextUsers) => {
        setUsers(nextUsers);
        setUsersLoading(false);
      },
      () => {
        setUsersError("Impossible de charger les utilisateurs.");
        setUsersLoading(false);
      },
    );

    return () => unsubscribe();
  }, [authLoading, user]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {usersError ? (
            <div className="px-4 text-sm text-destructive">{usersError}</div>
          ) : authLoading || usersLoading ? (
            <div className="px-4 text-sm text-muted-foreground">
              Chargement des utilisateurs...
            </div>
          ) : (
            <DataTable data={users} />
          )}
        </div>
      </div>
    </div>
  );
}
