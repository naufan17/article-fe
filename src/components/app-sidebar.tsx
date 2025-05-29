import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

interface SiderbarProps {
  data: {
    navMain: {
      title: string
      url: string
      icon: React.ElementType
      isActive?: boolean
    }[]
  }
}

export function AppSidebar({ data }: SiderbarProps) {
  return (
    <Sidebar className="border-r-0 bg-primary text-white">
      <SidebarHeader>
        <Link href="/articles" className="p-2 w-36 sm:w-40 h-auto flex items-center justify-center">
          <Image 
            src="/logo-white.svg" 
            alt="Logo" 
            width={150} 
            height={40} 
          />
        </Link>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
