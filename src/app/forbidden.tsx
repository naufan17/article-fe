import Link from "next/link"

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        403
      </h1>
      <p className="text-lg">
        Page Forbidden
      </p>
      <Link href="/" className="text-blue-500">
        Go Home
      </Link>
    </div>
  )
}