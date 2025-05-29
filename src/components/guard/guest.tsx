/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from "react";
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

  useEffect(() => {
    if (isAuthenticated && role === 'Admin') router.push(`/${role.toLocaleLowerCase()}/articles`);
    else if (isAuthenticated && role === 'User') router.push('/articles');
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role ? null : <>{children}</>;
}