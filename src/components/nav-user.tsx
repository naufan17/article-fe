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
import { setLogout } from "@/store/slices/auth-slice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks/api/use-profile"

export function NavUser({ color }: { color: string }) {
  const dispatch = useDispatch<AppDispatch>()
  const role: 'User' | 'Admin' | null = useSelector((state: RootState) => state.auth.role)
  const router = useRouter()
  const { data: profile, isLoading } = useProfile()

  const handleLogout = () => {
    dispatch(setLogout())
    router.push("/login")
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center">
          <div className="h-6 sm:h-8 w-6 sm:w-8 rounded-full mr-2 bg-slate-200 animate-pulse"/>
          <data className="h-2 w-16 rounded-md bg-slate-200 animate-pulse"/>
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
