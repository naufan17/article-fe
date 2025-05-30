'use client'

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbList, 
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Newspaper, Tag } from "lucide-react";

const navMain = [
  {
    title: "Articles",
    url: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tag,
  },
];

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();

  const data = {
    navMain: navMain.map(item => ({
      ...item,
      isActive: pathname.startsWith(item.url),
    })),
  };

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 font-semibold text-base sm:text-lg">
                    Articles
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <NavUser color="black" />
          </div>
        </header>
        <div className="bg-secondary h-full">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}