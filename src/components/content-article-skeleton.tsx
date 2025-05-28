export function ContentArticleSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto gap-4 py-8 md:py-12 sm:max-w-lg lg:max-w-screen-lg">
      <span className="text-sm font-medium text-slate-600">
        <div className="h-8 bg-slate-200 rounded-md animate-pulse" />
      </span>
      <h1 className="text-2xl sm:text-3xl font-semibold">
        <div className="h-16 bg-slate-200 rounded-md animate-pulse" />
      </h1>
      <div className="my-4">
        <div className="h-[480px] rounded-xl bg-slate-200 animate-pulse" />
      </div>
      <div className="text-sm sm:text-base font-normal whitespace-pre-line">
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}