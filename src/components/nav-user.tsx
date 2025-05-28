"use client"

import * as React from "react"
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  Newspaper,
} from "lucide-react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar"
import Link from "next/link"
import { setLogout } from "@/store/slices/auth-slice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"

const profile = {
  name: "John Doe",
  email: "V7A1o@example.com",
  avatar: "https://github.com/shadcn.png",
}

export function NavUser() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(setLogout())
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 rounded-full mr-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image"/>
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium text-white">
              {profile?.name}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <BadgeCheck />
              Profile
            </DropdownMenuItem>
          </Link>
          <div onClick={handleLogout}>
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </div>            
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
