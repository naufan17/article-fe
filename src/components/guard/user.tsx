'use client'

import { useEffect } from "react";
import { useRouter, forbidden } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";

export default function UserGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else if (role !== 'User') forbidden();
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role === 'User' ? <>{children}</> : null
}