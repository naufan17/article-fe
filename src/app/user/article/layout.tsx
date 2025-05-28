import UserGuard from "@/components/guard/user";

export default function UserLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <UserGuard>{children}</UserGuard>;
}