/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux"

export default function UserLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const role: 'User' = useSelector((state: any) => state.auth.role);
  const router = useRouter();

  useEffect(() => {
    if (role !== 'User') {
      router.push('/');
    }
  }, [role]);

  return <>{children}</>
}