/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from "react";
import { useRouter, forbidden } from "next/navigation";
import { useSelector } from "react-redux"

export default function UserGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' = useSelector((state: any) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else if (role !== 'User') forbidden();
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role === 'User' ? <>{children}</> : null
}