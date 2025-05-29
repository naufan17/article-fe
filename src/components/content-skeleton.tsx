export function ContentSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center mx-auto py-8 px-4 md:py-12 md:px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2 md:gap-4 w-full">
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
     </div>
    </div>
  );
}