import GuestGuard from "@/components/guard/guest";

export default function RegisterLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <GuestGuard>{children}</GuestGuard>;
}