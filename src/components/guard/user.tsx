'use client'

import { useEffect } from "react";
import { useRouter, forbidden } from "next/navigation";
import { useSelector } from "react-redux"
import { RootState } from "@/store/store";

export default function UserGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' | null = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else if (role !== 'User') forbidden();
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role === 'User' ? <>{children}</> : null
}