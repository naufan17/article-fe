import { AppSidebar } from "@/components/app-sidebar";
import AdminGuard from "@/components/guard/admin";
import { NavUser } from "@/components/nav-user";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AdminGuard>
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
    </AdminGuard>
  )
}