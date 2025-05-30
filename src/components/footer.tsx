import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row gap-1  justify-center items-center">
        <Link href="/articles" className="p-2 w-34 sm:w-40">
          <Image 
          src="/logo-white.svg" 
          alt="Logo" 
          width={120} 
          height={30} 
          />
        </Link>
        <p className="text-sm sm:text-base font-normal text-center justify-center">
          © 2025 Blog genzet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}