/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"

export default function GuestGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' = useSelector((state: any) => state.auth.role);
  const router = useRouter();

  if (isAuthenticated && role === 'Admin') router.push(`/${role.toLocaleLowerCase()}/articles`);
  if (isAuthenticated && role === 'User') router.push(`/articles`);

  return isAuthenticated && role ? null : <>{children}</>;
}