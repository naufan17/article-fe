'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AlertCircle, LucideGitCommitHorizontal } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@/hooks/api/use-login"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { useDispatch } from "react-redux"
import { setLogin } from "@/store/slices/auth-slice"
import { AppDispatch } from "@/store/store"

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
  const loginUser = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
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
          <Link href="/" className="text-black text-xl font-bold">
            <LucideGitCommitHorizontal className="inline-block mr-2 text-blue-600" />
            LogoIpsum
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Login
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
