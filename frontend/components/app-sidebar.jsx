import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Application navigation (to be conditionally rendered later based on role)
const navUser = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Membership", url: "/membership" },
  {
    title: "Attendance",
    url: "/attendance",
    items: [{ title: "Peak Hours", url: "/attendance/peak-hours" }],
  },
  { title: "Payments", url: "/payments" },
  { title: "Notifications", url: "/notifications" },
  { title: "Trainer Plan", url: "/trainer-plan" },
  { title: "Book Slot", url: "/book-slot" },
  { title: "Check-In", url: "/check-in" },
  {
    title: "Auth",
    url: "/login",
    items: [
      { title: "Login", url: "/login" },
      { title: "Register", url: "/register" },
    ],
  },
];

const navAdmin = [
  { title: "Dashboard", url: "/admin/dashboard" },
  { title: "Members", url: "/admin/members" },
  { title: "Trainers", url: "/admin/trainers" },
  {
    title: "Attendance",
    url: "/admin/attendance/current",
    items: [
      { title: "Current", url: "/admin/attendance/current" },
      { title: "Logs", url: "/admin/attendance/logs" },
    ],
  },
  {
    title: "Payments",
    url: "/admin/payments",
    items: [{ title: "Reminders", url: "/admin/payments/reminders" }],
  },
  {
    title: "Analytics",
    url: "/admin/analytics/peak-hours",
    items: [
      { title: "Peak Hours", url: "/admin/analytics/peak-hours" },
      { title: "Revenue", url: "/admin/analytics/revenue" },
      { title: "Inactive Members", url: "/admin/analytics/inactive-members" },
      { title: "Dues", url: "/admin/analytics/dues" },
    ],
  },
  { title: "Stock", url: "/admin/stock" },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Gym Management</span>
                  <span className="">App</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navUser.map((item) => (
                <SidebarMenuItem key={`user-${item.title}`}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={`user-sub-${sub.title}`}>
                          <SidebarMenuSubButton asChild>
                            <a href={sub.url}>{sub.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navAdmin.map((item) => (
                <SidebarMenuItem key={`admin-${item.title}`}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={`admin-sub-${sub.title}`}>
                          <SidebarMenuSubButton asChild>
                            <a href={sub.url}>{sub.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
