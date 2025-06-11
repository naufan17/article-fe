"use client"

import * as React from "react"
import {
  LogOut,
  Newspaper,
  User,
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
import { useRouter } from "next/navigation"
import { useProfile } from "@/lib/api/use-profile"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthStore } from "@/stores/use-auth-store"

export function NavUser({ color }: { color: string }) {
  const { role, setLogout } = useAuthStore()
  const { data: profile, isLoading } = useProfile()
  const router = useRouter()

  const handleLogout = () => {
    setLogout()
    router.push("/login")
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center">
          <Skeleton className="h-6 sm:h-8 w-6 sm:w-8 rounded-full mr-2" />
          <Skeleton className="h-2 w-16" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <div className="flex items-center">
              <Avatar className="h-6 sm:h-8 w-6 sm:w-8 rounded-full mr-2">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image"/>
                <AvatarFallback className="rounded-lg">
                  {profile?.username?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span
                  className="truncate text-xs sm:text-sm font-medium"
                  style={{ color: color === "black" ? "#000" : "#fff" }}
                >
                  {profile?.username}
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
              {role === "Admin" && (
                <>
                  <Link href="/admin/profile">
                    <DropdownMenuItem>
                      <User />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/admin/articles">
                    <DropdownMenuItem>
                      <Newspaper />
                      Articles
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
              {role === "User" && (
                <Link href="/user/profile">
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>
                </Link>
              )}
              <div onClick={handleLogout}>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="text-red-600"/>
                  Log out
                </DropdownMenuItem>
              </div>            
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
}
