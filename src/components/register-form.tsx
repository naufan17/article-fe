import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { LucideGitCommitHorizontal } from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="JohnDoe"
                    className="bg-white text-black text-sm"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••" 
                    className="bg-white text-black text-sm"
                    required 
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-white text-black text-sm">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Login
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
