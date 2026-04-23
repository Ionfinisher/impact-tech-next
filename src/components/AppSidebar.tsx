"use client";

import * as React from "react";
import {
  IconBriefcase,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconMessage,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/NavDocuments";
import { NavMain } from "@/components/NavMain";
import { NavSecondary } from "@/components/NavSecondary";
import { NavUser } from "@/components/NavUser";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserSkeleton } from "@/components/UserSkeleton";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/app",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Commandes",
      url: "/app/orders",
      icon: IconListDetails,
    },
    {
      title: "Catégories des services",
      url: "/app/categories",
      icon: IconFolder,
    },
    {
      title: "Services",
      url: "/app/services",
      icon: IconBriefcase,
    },
    {
      title: "Utilisateurs",
      url: "/app/users",
      icon: IconUsers,
    },
    {
      title: "Messages",
      url: "/app/messages",
      icon: IconMessage,
    },
    {
      title: "Blog",
      url: "#",
      icon: IconFolder,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/app/settings",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">SocialSync</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <UserSkeleton />
        ) : user ? (
          <NavUser />
        ) : (
          <div className="p-4 text-sm text-red-500">Not authenticated</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
