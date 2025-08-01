"use client";

import * as React from "react";
import {
  ChartPie,
  Blocks,
  Command,
  LifeBuoy,
  History,
  Send,
  ArrowLeftRight,
  ChartColumn,
  Wallet,
  CalendarDays,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-users";
import { Separator } from "@radix-ui/react-context-menu";
import Link from "next/link";
import { NavProjects } from "./nav-projects";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: ChartColumn,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRight,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Blocks,
    },
    {
      title: "Balance",
      url: "/balance",
      icon: ChartPie,
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: Wallet,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Calendar",
      url: "/calendar",
      icon: CalendarDays,
    },
    {
      name: "History",
      url: "/history",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Budget Tracker</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator className="w-full bg-border h-[0.2px]" />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
