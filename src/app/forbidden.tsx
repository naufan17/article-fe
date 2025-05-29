"use client";

import { useRouter } from "next/navigation";

export default function Forbidden() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        403
      </h1>
      <p className="text-lg">
        Page Forbidden
      </p>
      <button
        onClick={() => router.back()}
        className="text-blue-500 cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
}