'use client'

import { useEffect } from "react";
import { useRouter, forbidden } from "next/navigation";
import { useSelector } from "react-redux"
import { RootState } from "@/store/store";

export default function AdminGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' | null = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else if (role !== 'Admin') forbidden();
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role === 'Admin' ? <>{children}</> : null
}