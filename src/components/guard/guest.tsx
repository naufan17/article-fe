'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";

export default function GuestGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && role === 'Admin') router.push(`/${role.toLocaleLowerCase()}/articles`);
    else if (isAuthenticated && role === 'User') router.push('/articles');
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role ? null : <>{children}</>;
}