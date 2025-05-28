/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import {
  BadgeCheck,
  LogOut,
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
import { AppDispatch } from "@/store/store"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks/api/use-profile"

export function NavUser() {
  const dispatch = useDispatch<AppDispatch>()
  const role = useSelector((state: any) => state.auth.role)
  const router = useRouter()
  const { data: profile, isLoading } = useProfile()

  const handleLogout = () => {
    dispatch(setLogout())
    router.push("/login")
  }

  return (
    <>
      {isLoading ? (
        <div className="h-10 w-20 rounded-lg bg-slate-200 animate-pulse"></div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 rounded-full mr-2">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image"/>
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
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
                      <BadgeCheck />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/admin/articles">
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Articles
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
              {role === "User" && (
                <Link href="/user/profile">
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Profile
                  </DropdownMenuItem>
                </Link>
              )}
              <div onClick={handleLogout}>
                <DropdownMenuItem>
                  <LogOut />
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
