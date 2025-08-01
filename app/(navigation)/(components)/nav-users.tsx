"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser, SignOutButton } from "@clerk/nextjs";
import UserProfileDialog from "@/components/UserProfileDialog";
import { useState } from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, isLoaded } = useUser();
  const [userProfileDialogOpen, setUserProfileDialogOpen] = useState(false);

  const avatar = user?.imageUrl || "/avatars/shadcn.jpg";
  const name =
    `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Guest";
  const email =
    user?.emailAddresses?.[0]?.emailAddress || "no-email@example.com";
  const initials = user?.firstName?.[0]?.toUpperCase() || "GU";

  const handleProfileClick = () => {
    if (isLoaded) {
      setUserProfileDialogOpen((prev) => !prev);
    }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt="avatar" />
                  <AvatarFallback className="rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="rounded-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleProfileClick()}
                >
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <SignOutButton>
                <DropdownMenuItem className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <UserProfileDialog
        open={userProfileDialogOpen}
        onOpenChange={handleProfileClick}
      />
    </>
  );
}
