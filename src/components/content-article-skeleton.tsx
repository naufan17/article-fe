import { Skeleton } from "./ui/skeleton";

export function ContentArticleSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto gap-4 py-8 md:py-12 sm:max-w-lg lg:max-w-screen-lg">
      <span className="text-sm font-medium text-slate-600">
        <Skeleton className="h-8" />
      </span>
      <h1 className="text-2xl sm:text-3xl font-semibold">
        <Skeleton className="h-16" />
      </h1>
      <div className="my-4">
        <Skeleton className="h-[480px] rounded-xl" />
      </div>
      <div className="text-sm sm:text-base font-normal whitespace-pre-line">
        <Skeleton className="h-96 rounded-xl" />
      </div>
    </div>
  )
}