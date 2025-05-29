import UserGuard from "@/components/guard/user";

export default function ProfileLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <UserGuard>
      {children}
    </UserGuard>
  )
}