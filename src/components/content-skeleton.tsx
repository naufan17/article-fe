import { Skeleton } from "@/components/ui/skeleton";

export function ContentSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center mx-auto py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start gap-4 md:gap-6 w-full">
        <Skeleton className="h-80 sm:h-96" />
        <Skeleton className="h-80 sm:h-96" />
        <Skeleton className="h-80 sm:h-96" />
     </div>
    </div>
  );
}