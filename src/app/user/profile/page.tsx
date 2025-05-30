import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Profile } from "@/components/profile"

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen -my-18 md:-my-20">
        <Profile />
      </div>
      <Footer />
    </>
  )
}