import { LucideGitCommitHorizontal } from "lucide-react";
import Link from "next/link";


export function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-center items-center">
        <Link href="/" className="text-white text-lg font-semibold justify-center">
          <LucideGitCommitHorizontal className="inline-block mr-2" />
          LogoIpsum
        </Link>
        <p className="text-base font-normal text-center justify-center">
          © 2025 Blog genzet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}