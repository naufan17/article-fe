import { LucideGitCommitHorizontal } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent py-4">
      <div className="hidden sm:flex flex-wrap justify-between items-center mx-auto py-2 px-4 md:py-4 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <Link href="/" className="text-white text-xl font-bold">
          <LucideGitCommitHorizontal className="inline-block mr-2" />
          LogoIpsum
        </Link>
      </div>
    </nav>
  );
}