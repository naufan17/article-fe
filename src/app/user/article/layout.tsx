/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { forbidden } from "next/navigation";
import { useSelector } from "react-redux"

export default function UserLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const role: 'User' = useSelector((state: any) => state.auth.role);

  if (role !== 'User') forbidden();

  return <>{children}</>
}