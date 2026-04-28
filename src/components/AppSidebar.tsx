"use client";

import * as React from "react";
import Image from "next/image";
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
      title: "Tableau de bord",
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
      title: "Catégories de blog",
      url: "/app/blog/categories",
      icon: IconFolder,
    },
    {
      title: "Blog",
      url: "/app/blog",
      icon: IconBriefcase,
    },
  ],
  navSecondary: [],
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
                <Image
                  src="/images/LOGO-IMPACT-TECH.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                <span className="text-base font-semibold">
                  Impact Tech Admin
                </span>
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
