/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter, forbidden } from "next/navigation";
import { useSelector } from "react-redux"

export default function AdminGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' = useSelector((state: any) => state.auth.role);
  const router = useRouter();

  if (!isAuthenticated) router.push('/login');
  if (role !== 'Admin') forbidden();

  return isAuthenticated && role === 'Admin' ? <>{children}</> : null
}