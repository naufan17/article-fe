"use client"

import * as React from "react"
import {
  Newspaper,
  Tag,
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Articles",
      url: "#",
      icon: Newspaper,
      isActive: true,
    },
    {
      title: "Category",
      url: "#",
      icon: Tag,
      isActive: false,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 bg-primary text-white" {...props}>
      <SidebarHeader>
        <Link href="/" className="p-2">
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
