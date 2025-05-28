/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"

export default function GuestLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' = useSelector((state: any) => state.auth.role);
  const router = useRouter();

  if (isAuthenticated && role) router.push(`/${role.toLocaleLowerCase()}/article`);

  return isAuthenticated && role ? null : <>{children}</>;
}