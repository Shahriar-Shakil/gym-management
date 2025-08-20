"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AppUserSidebar } from "./userSidebar";

// Wrap shadcn AppSidebar, but ensure only app links are present inside AppSidebar config
export default function DashboardSidebar() {
  return <AppUserSidebar />;
}
