/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";
// import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <nav className="relative top-0 z-50 w-full bg-transparent border-b border-slate-200">
      <div className="hidden sm:flex  flex-wrap justify-between items-center mx-auto py-2 px-4 md:py-4 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <Link href="/" className="p-2">
          <Image 
          src="/logo-color.svg" 
          alt="Logo" 
          width={150} 
          height={30} 
          />
        </Link>
        <div>
          <NavUser />
        </div>
      </div>
    </nav>
  );
}