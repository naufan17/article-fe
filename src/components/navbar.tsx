/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from "next/link";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated);
  
  return (
    <nav className="relative top-0 z-50 w-full bg-transparent border-b border-slate-200">
      <div className="flex flex-wrap justify-between items-center mx-auto py-2 px-4 md:py-4 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <Link href="/articles" className="p-2 w-34 sm:w-40 h-auto flex items-center justify-center">
          <Image 
            src="/logo-color.svg" 
            alt="Logo" 
            width={150} 
            height={30} 
          />
        </Link>
        <div>
          {isAuthenticated ? (
            <NavUser color="black" />
          ): (
            <Link href="/login" className="p-2">
              <Button variant="outline" className="px-3 sm:px-4 text-xs sm:text-sm cursor-pointer bg-transparent text-black border-black">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}