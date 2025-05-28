import GuestGuard from "@/components/guard/guest";

export default function LoginLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <GuestGuard>{children}</GuestGuard>;
}