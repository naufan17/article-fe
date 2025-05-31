'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"
import { RootState } from "@/store/store";

export default function GuestGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.auth.isAuthenticated);
  const role: 'User' | 'Admin' | null = useSelector((state: RootState) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && role === 'Admin') router.push(`/${role.toLocaleLowerCase()}/articles`);
    else if (isAuthenticated && role === 'User') router.push('/articles');
  }, [isAuthenticated, role, router]);

  return isAuthenticated && role ? null : <>{children}</>;
}