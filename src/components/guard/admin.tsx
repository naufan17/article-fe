'use client'

import { useEffect } from "react";
import { useRouter, forbidden } from "next/navigation";
import { useAuthStore } from "@/stores/use-auth-store";

export default function AdminGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else if (role !== 'Admin') forbidden();
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role === 'Admin' ? <>{children}</> : null
}