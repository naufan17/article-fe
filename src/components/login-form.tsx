/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { setLogin } from "@/store/slices/auth-slice"
import { AppDispatch } from "@/store/store"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@/hooks/api/use-login"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useDispatch } from "react-redux"

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type FormData = z.infer<typeof formSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const loginUser = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    setLoading(true)

    loginUser.mutate(data, {
      onSuccess: (response) => {
        setError(null)
        dispatch(setLogin({ token: response.data.token, role: response.data.role }))
      },
      onError: (error: any) => {
        setError(error.response?.data?.message || "Login failed")
      },
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-none border-none sm:border">
        <CardHeader className="text-center justify-center px-0 sm:px-6">
          <Link href="/articles" className="p-2 w-28 sm:w-40 h-auto flex items-center justify-center">
            <Image 
              src="/logo-color.svg" 
              alt="Logo" 
              width={150} 
              height={30} 
            />
          </Link>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {error && (
                <Alert 
                  variant="destructive" 
                  className="border-destructive"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="mb-0 tracking-normal">
                    {error}
                  </AlertTitle>
                </Alert>
              )}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    {...register("username")}
                    placeholder="JohnDoe"
                    className="bg-white text-black text-sm"
                    required
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    {...register("password")}
                    placeholder="••••••••"
                    className="bg-white text-black text-sm"
                    required 
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                >
                  {loading ? (
                    <svg className="inline w-7 h-7 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  ):(
                    "Login"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
