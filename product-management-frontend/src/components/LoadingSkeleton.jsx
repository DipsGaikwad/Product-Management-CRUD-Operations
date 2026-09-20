function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-52 animate-pulse bg-slate-200" />

          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;