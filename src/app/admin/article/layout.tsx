/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { forbidden } from "next/navigation";
import { useSelector } from "react-redux"

export default function UserLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const role: 'Admin' = useSelector((state: any) => state.auth.role);

  if (role !== 'Admin') forbidden();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 font-semibold text-lg">
                    Articles
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavUser />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}