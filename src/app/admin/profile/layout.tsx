import AdminGuard from "@/components/guard/admin";
import AdminLayout from "@/components/layout/admin";

export default function ProfileLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <AdminGuard>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminGuard>
  )
}