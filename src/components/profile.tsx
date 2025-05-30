'use client'

import Link from "next/link"
import { useProfile } from "@/hooks/api/use-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Profile() {
  const { data: profile, isLoading } = useProfile()

  return (
    <div className="flex flex-col justify-center items-center mx-auto gap-2 py-8 px-4 md:py-12 md:px-8 sm:max-w-sm">
      {isLoading ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Profile
          </h2>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="h-24 w-24 rounded-full my-4 bg-slate-200 animate-pulse" />
            <div className="flex flex-row gap-2 w-full bg-gray-50 px-4 py-2 rounded-md border border-slate-200">
              <div className="h-6 bg-slate-200 rounded-md animate-pulse"/>
            </div>
            <div className="flex flex-row gap-2 w-full bg-gray-50 px-4 py-2 rounded-md border border-slate-200">
              <div className="h-6 bg-slate-200 rounded-md animate-pulse"/>
            </div>
            <div className="h-6 bg-slate-200 rounded-md animate-pulse"/>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            Profile
          </h1>
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <Avatar className="h-20 sm:h-24 w-20 sm:w-24 rounded-full my-4">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image"/>
              <AvatarFallback className="rounded-lg">
                {profile?.username?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-row gap-2 w-full bg-gray-50 px-4 py-2 rounded-md border border-slate-200">
              <span className="text-sm sm:text-base font-semibold">Username</span>
              <span className="text-sm sm:text-base">:</span>
              <span className="text-sm sm:text-base">{profile?.username}</span>
            </div>
            <div className="flex flex-row gap-2 w-full bg-gray-50 px-4 py-2 rounded-md border border-slate-200">
              <span className="font-semibold text-sm sm:text-base">Role</span>
              <span className="text-sm sm:text-base">:</span>
              <span className="text-sm sm:text-base">{profile?.role}</span>
            </div>
            <Link href="/articles" className="w-full">
              <Button className="bg-blue-600 w-full cursor-pointer">
                Back to Home
              </Button>
            </Link>
          </div>
        </>        
      )}
    </div>
  )
}